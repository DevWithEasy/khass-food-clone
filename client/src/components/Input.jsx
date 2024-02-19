const Input = ({ label, name,value,placeholder, handleChange }) => {
    return (
        <div
            className="space-y-2"
        >
            <label>{label} :</label>
            <input
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full p-2 border focus:border focus:outline-green-400 rounded"
                required
            />
        </div>
    );
};

export default Input;
