import { Typography, Box } from "@mui/material";
import { useAppDispatch } from "../../../store";
import ImageButton from "../../common/imageButton";



export default function SubwayPolicyScreen() {
    const dispatch = useAppDispatch();

    // TODO: Look in to creating a tool-tip so the user can hover over "as-of-right" and get a brief definition

    // TODO: Actually implement the ONCLICK method to update the store with the users selection.. And a whole lot of styling.
    return (
        <div>
            <Typography id="policy-modal-description" sx={{ mt: 2 }}>
              What kind of development should be permitted as-of-right within 500m of a subway station? 
            </Typography>
            <Box>
                <ImageButton 
                  sourceUrl="https://upload.wikimedia.org/wikipedia/commons/3/37/Suburbia_by_David_Shankbone.jpg"
                  width="50%"
                  title="Low Density"
                />
                <ImageButton 
                  sourceUrl="https://upload.wikimedia.org/wikipedia/commons/3/3d/Condo_Towers_Bayview_Village.jpg"
                  width="50%"
                  title="High Density"
                />
            </Box>
        </div>    
    );
  }