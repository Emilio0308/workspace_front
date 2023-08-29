import TextField from "@mui/material/TextField";
const InputLogin = ({ name, type, handleChangeInput, value, style }) => {
  return (
      <TextField
        label={name}
        onChange={handleChangeInput}
        id={name}
        name={name}
        value={value}
        type={type}
        required
        autoComplete='off'
        sx={style}
      />
  );
};
export default InputLogin;
