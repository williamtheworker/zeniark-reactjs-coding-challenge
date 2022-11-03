// MUI Components
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const CustomDialogBox = (props) => {
    const { children, open, onClose, title, content_text, content, actions, maxWidth, fullWidth } = props;

    return (
        <Box>
            <Dialog
                open={open}
                onClose={onClose}
                arai-labelledby="custom-dialog"
                maxWidth={maxWidth}
                fullWidth={fullWidth}
                hideBackdrop={true}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{'textAlign': 'center'}}>
                        {content_text}
                    </DialogContentText>
                    {content}
                    {children}
                </DialogContent>
                <DialogActions>
                    {actions}
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CustomDialogBox;