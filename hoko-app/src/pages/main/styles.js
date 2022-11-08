import styled from 'styled-components';
import { FontSize } from '../../assets/font';
import { 
    Typography,
    Grid,
    Card,
    LinearProgress
 } from '@mui/material';
import Color from '../../assets/colors';

// Typography
export const Title = styled(Typography)`
    && {
        font-size: ${FontSize.header3};
        font-weight: 500;
    }
`;

// Grid
export const TitleWrapper = styled(Grid)`
    && {
        margin: 20px 30px;
    }
`