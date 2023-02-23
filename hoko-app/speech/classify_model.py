import spacy
from spacy.util import minibatch, compounding
from spacy.training import Example
import pandas as pd
import numpy as np
import os

DATA_PATH = 'data/direction_phrases_dataset.txt'

# n_texts=len(df)

n_iter=15

train_split = 0.8

def load_module():
    nlp = spacy.load("ja_core_news_sm")
    return nlp

def func(category):
    cats = {'forward': False, 'behind': False, 'turn_left': False, 'turn_right': False}
    cats[category] = True
    return cats

def load_data(split=train_split):
    df = pd.read_csv(DATA_PATH, names=['phrase', 'move'])

    limit = len(df)

    df['tuples'] = df.apply(
        lambda row: (row['phrase'],row['move']), axis=1)
    train = df['tuples'].tolist()

    train_data = train
    np.random.shuffle(train_data)
    train_data = train_data[-limit:]
    texts, labels = zip(*train_data)
    print(labels)
    print(labels[0])
    cats = [func(labels[y]) for y in range(len(labels))]
    split = int(len(train_data) * split)
    return (texts[:split], cats[:split]), (texts[split:], cats[split:]), limit

def evaluate(tokenizer, textcat, texts, cats):
    docs = (tokenizer(text) for text in texts)
    correct = 0
    total = len(texts)
    for i, doc in enumerate(textcat.pipe(docs)):
        gold = cats[i]
        scores = list(doc.cats.values())
        max_index = scores.index(max(scores))
        truth_values = list(gold.values())
        true_index = truth_values.index(True)
        if max_index == true_index:
            correct += 1
    accuracy = correct / total

    return {'textcat_a': accuracy}

def add_model(nlp):
    if 'textcat' not in nlp.pipe_names:
        nlp.add_pipe('textcat', last=True)
    else:
        textcat = nlp.get_pipe('textcat')
        print(textcat)

    textcat = nlp.get_pipe('textcat')

    # add label to text classifier
    textcat.add_label('forward')
    textcat.add_label('behind')
    textcat.add_label('turn_right')
    textcat.add_label('turn_left')

    return textcat, nlp

# load the dataset
def get_datasets():
    print("Loading Japanese phrases data...")
    (train_texts, train_cats), (dev_texts, dev_cats), n_texts = load_data()
    print("Using {} examples ({} training, {} evaluation)"
        .format(n_texts, len(train_texts), len(dev_texts)))
    train_data = list(zip(train_texts,
                        [{'cats': cats} for cats in train_cats]))

    return train_texts, train_cats, dev_texts, dev_cats, train_data

def train(textcat, nlp):
    train_texts, train_cats, dev_texts, dev_cats, train_data = get_datasets()
    # get names of other pipes to disable them during training
    other_pipes = [pipe for pipe in nlp.pipe_names if pipe != 'textcat']
    with nlp.disable_pipes(*other_pipes):  # only train textcat
        optimizer = nlp.begin_training()
        print("Training the model...")
        print('{:^5}\t{:^5}'.format('LOSS', 'A'))
        for i in range(n_iter):
            losses = {}
            # batch up the examples using spaCy's minibatch
            batches = minibatch(train_data, size=compounding(4., 32., 1.001))
            for batch in batches:          
                for text, annotations in batch:
                    doc = nlp.make_doc(text)
                    example = Example.from_dict(doc, annotations)
                    nlp.update([example], drop=0.2, sgd=optimizer, losses=losses)
            with textcat.model.use_params(optimizer.averages):
                scores = evaluate(nlp.tokenizer, textcat, dev_texts, dev_cats)

            print('{0:.3f}\t{1:.3f}'  # print a simple table
                .format(losses['textcat'], scores['textcat_a'])
                )
    return nlp

def run_model():
    nlp = load_module()
    textcat, nlp = add_model(nlp)
    nlp = train(textcat, nlp)
    # move = predict(nlp, '100メートル行ってください')
    nlp.to_disk(os.path.join(os.getcwd(), 'model'))

# run_model()