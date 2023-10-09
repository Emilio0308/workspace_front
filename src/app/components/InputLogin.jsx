import TextField from "@mui/material/TextField";
const InputLogin = ({ name, type, handleChangeInput, value, style, onBlur = null, variant="standard" }) => {
  return (
      <TextField
        variant={variant}
        label={name}
        onChange={handleChangeInput}
        id={name}
        name={name}
        value={value || ""}
        type={type}
        onBlur={onBlur}
        required
        autoComplete='off'
        sx={style}
      />
  );
};
export default InputLogin;
