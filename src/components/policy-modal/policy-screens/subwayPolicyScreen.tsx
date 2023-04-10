import { Typography, Box, Button } from '@mui/material';
import { SubwayPolicyState } from '../../../models/enums';
import { setSubwayPolicy } from '../../../reducers/policySlice';
import { subwayPolicy } from '../../../selectors';
import { useAppDispatch, useAppSelector } from '../../../store';
import ImageButton from '../../common/imageButton';
import './subwayPolicyScreen.css';

export default function SubwayPolicyScreen() {
  const dispatch = useAppDispatch();
  const currentPolicy = useAppSelector(subwayPolicy);

  const updateSubwayPolicy = (newPolicy: SubwayPolicyState) => {
    return () => {
      dispatch(setSubwayPolicy({ newPolicy: newPolicy }));
    };
  };

  // TODO: Look in to creating a tool-tip so the user can hover over "as-of-right" and get a brief definition

  // TODO: Actually implement the ONCLICK method to update the store with the users selection.. And a whole lot of styling.
  return (
    <div>
      <Typography id="policy-modal-description" sx={{ mt: 2 }}>
        What kind of development should be permitted with out any special permission within 500m of a subway station?
      </Typography>
      <Box>
        <ImageButton
          sourceUrl="https://upload.wikimedia.org/wikipedia/commons/3/37/Suburbia_by_David_Shankbone.jpg"
          width="50%"
          title="Low Density"
          selected={currentPolicy === SubwayPolicyState.LOW_DENSITY}
          onClick={updateSubwayPolicy(SubwayPolicyState.LOW_DENSITY)}
          tooltipText="Roughly 2000-4000 persons per sq. km"
        />
        <ImageButton
          sourceUrl="https://upload.wikimedia.org/wikipedia/commons/3/3d/Condo_Towers_Bayview_Village.jpg"
          width="50%"
          title="High Density"
          selected={currentPolicy === SubwayPolicyState.HIGH_DENSITY}
          onClick={updateSubwayPolicy(SubwayPolicyState.HIGH_DENSITY)}
          tooltipText="Roughly 15000-20000 persons per sq. km"
        />
      </Box>
      <div id="no-preference-button-div">
        <Button href="#text-buttons" onClick={updateSubwayPolicy(SubwayPolicyState.NOT_SET)}>
          No Preference
        </Button>
      </div>
    </div>
  );
}
