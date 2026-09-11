"use client";

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedProps<T extends string> {
  name: string;
  label: string;
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

// Radio group styled as a pill toggle; keeps native arrow-key behaviour.
export function Segmented<T extends string>({ name, label, options, value, onChange }: SegmentedProps<T>) {
  return (
    <fieldset className="sc-seg-group">
      <legend className="sc-label">{label}</legend>
      <div className="sc-seg">
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={option.value === value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

interface InputBoxProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  inputMode: "decimal" | "numeric";
  placeholder?: string;
  suffix?: string;
  ariaLabel?: string;
  errorId?: string;
}

// Text input (not type=number) so decimal commas work and there are no spinners.
export function InputBox({ id, value, onChange, inputMode, placeholder, suffix, ariaLabel, errorId }: InputBoxProps) {
  return (
    <div className="sc-input" data-invalid={errorId ? "" : undefined}>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        onChange={(event) => onChange(event.target.value)}
      />
      {suffix && (
        <span className="sc-suffix" aria-hidden="true">
          {suffix}
        </span>
      )}
    </div>
  );
}

interface FieldProps extends Omit<InputBoxProps, "errorId" | "ariaLabel"> {
  label: string;
  error?: string;
}

export function Field({ label, error, ...input }: FieldProps) {
  const errorId = error ? `${input.id}-error` : undefined;

  return (
    <div className="sc-field">
      <label className="sc-label" htmlFor={input.id}>
        {label}
      </label>
      <InputBox {...input} errorId={errorId} />
      {error && (
        <p className="sc-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
