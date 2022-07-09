import {
    Checkbox,
    InputLabel,
    FormControl,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultiSelect = ({label, items, itemFilter, handleChange}) => {
    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>{label}</InputLabel>
            <Select
                multiple
                value={itemFilter}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                renderValue={(selected) => {
                    const display = selected.join(", ");
                    if (display.length > 50) {
                        return `${selected.length} item(s) selected`;
                    }
                    return display;
                }}
                MenuProps={MenuProps}
            >
                {items.map((item, index) => {
                    return (
                        <MenuItem key={index} value={item}>
                            <Checkbox checked={itemFilter.includes(item)} />
                            <ListItemText primary={item} />
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    )
}

export default MultiSelect; 
