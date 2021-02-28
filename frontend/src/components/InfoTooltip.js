import React from 'react';
import PopupWithForm from './PopupWithForm';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: 900,
    fontSize: 24,
    margin: 0,
    '@media screen and (max-width: 512px)': {
      fontSize: 20,
      marginBottom: 50,
    },
  },
  checkicon: {
    maxHeight: 120,
    maxWidth: 120,
    marginTop: 26,
    marginBottom: 32,
    margin: 'auto',
    '@media screen and (max-width: 512px)': {
      marginTop: 50,
      marginBottom: 40,
    },
  },
});

const InfoTooltip = (props) => {
  const { isOpen, onClose, title, titleInfoTooltips, checkIcon } = props;

  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    setIsInfoTooltip(true);
  }, [isInfoTooltip]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      isInfoTooltip={isInfoTooltip}
      classes={classes}
      title={title}
      checkIcon={checkIcon}
      titleInfoTooltips={titleInfoTooltips}
    />
  );
};

export default InfoTooltip;
