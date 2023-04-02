import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
// import { SubwayPolicyState } from '../../models/enums';
// import { MouseEvent } from 'react';
import { Tooltip } from '@mui/material';

const StyledButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root' : {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    }
  },
  "& .MuiImageMarked-root.selected": {
    opacity: "0 !important"
  },
  "& .MuiImageBackdrop-root.selected": {
    opacity: "0.15 !important"
  },
  "& .MuiTypography-root.selected": {
    border: '4px solid currentColor'
  },

}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.6,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

interface ImageButtonProps {
  title: string, 
  sourceUrl: string,
  width: string
  selected?: boolean
  tooltipText?: string,
  onClick(): void
}



export default function ImageButton(props: ImageButtonProps) {
  console.log(`${props.title} Selected  ? ${props.selected}`);
  
  // const preserveHighlighting = (event: TransitionEvent) : void => {
  //   console.log("Here");
  //   if (props.selected === true) {
  //     event.preventDefault();
  //   } 
  // }


  let button = (
    <StyledButton
      // focusRipple
      key={props.title}
      style={{
        width: props.width,
      }}
      onClick = {props.onClick}
      className = {props.selected ? "selected" : "not-selected"}
    >
      <ImageSrc style={{ backgroundImage: `url(${props.sourceUrl})` }} />
      <ImageBackdrop className={`MuiImageBackdrop-root ${props.selected ? "selected" : "not-selected"}`} />
      <Image>
        <Typography
          component="span"
          variant="subtitle1"
          color="inherit"
          className = {props.selected ? "selected" : "not-selected"}
          sx={{
            position: 'relative',
            p: 4,
            pt: 2,
            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
          }}
        >
          {props.title}
          <ImageMarked 
            className= {`MuiImageMarked-root ${props.selected ? "selected" : "not-selected"}`}
          />
        </Typography>
      </Image>
    </StyledButton>

  );

  // If we have text for a tooltip, wrap a tooltip around it. 
  if (props.tooltipText) {
    return (
      <Tooltip title={props.tooltipText}>
        {button}
      </Tooltip>
    )
  }
  else {
    return button;
  }
}