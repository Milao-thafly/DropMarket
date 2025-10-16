import React from 'react';

// Définition des types de props pour le composant TextArea
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({ label, name, value, onChange, required = false, rows = 5, ...props }) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        {...props}
      />
    </div>
  );
};

export default TextArea;