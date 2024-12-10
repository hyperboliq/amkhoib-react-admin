// import React from 'react';
// import { useInput, InputProps, FieldTitle } from 'react-admin';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import Checkbox from '@mui/material/Checkbox';
// import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';
// interface OptionType {
//   id: string;
//   name: string;
// }
// interface MultiSelectInputProps extends InputProps {
//   options: OptionType[]; // Include other props specifically needed
// }
// // Example options, should be dynamic based on your actual use case
// const options: OptionType[] = [
//   { id: '1', name: 'Option 1' },
//   { id: '2', name: 'Option 2' },
//   { id: '3', name: 'Option 3' },
// ];
// const MultiSelectInput: React.FC<MultiSelectInputProps> = (props) => {
//   const {
//     field,
//     fieldState: { touched, error },
//     formState: { isSubmitted },
//     isRequired,
//   } = useInput(props);
//   return (
//     <Autocomplete
//       multiple
//       options={options}  // Use dynamic data if available
//       disableCloseOnSelect
//       getOptionLabel={(option: OptionType) => option.name}
//       value={field.value || []}  // Handle the case when the initial value is undefined
//       onChange={(event, newValue) => field.onChange(newValue)}
//       renderOption={(props, option, { selected }) => (
//         <li {...props}>
//           <Checkbox
//             icon={<CheckBoxOutlineBlank fontSize="small" />}
//             checkedIcon={<CheckBox fontSize="small" />}
//             style={{ marginRight: 8 }}
//             checked={selected}
//           />
//           {option.name}
//         </li>
//       )}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={<FieldTitle label={props.label} source={props.source} isRequired={isRequired} />}
//           error={touched && isSubmitted && !!error}
//           helperText={touched && isSubmitted && error}
//           variant="outlined"
//         />
//       )}
//     />
//   );
// };
// export default MultiSelectInput;