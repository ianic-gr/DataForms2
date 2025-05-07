interface InputEvents<T> {
  onSelect?: (value: T) => void;
  onBlur?: (value: T) => void;
  onChange?: (value: T) => void;
  onClick?: (value: T) => void;
  onDelete?: (value: T) => void;
}

interface UseInputEventsProps<T> {
  events?: InputEvents<T>;
}

export function useInputEvents<T>(props: UseInputEventsProps<T> = {}) {
  const onSelect = (value: T): void => {
    if (!props.events || !("onSelect" in props.events) || !props.events.onSelect) return;

    props.events.onSelect(value);
  };

  const onBlur = (value: T): void => {
    if (!props.events || !("onBlur" in props.events) || !props.events.onBlur) return;

    props.events.onBlur(value);
  };

  const onChange = (value: T): void => {
    if (!props.events || !("onChange" in props.events) || !props.events.onChange) return;

    props.events.onChange(value);
  };

  const onClick = (value: T): void => {
    if (!props.events || !("onClick" in props.events) || !props.events.onClick) return;

    props.events.onClick(value);
  };

  const onDelete = (value: T): void => {
    if (!props.events || !("onDelete" in props.events) || !props.events.onDelete) return;

    props.events.onDelete(value);
  };

  return {
    onSelect,
    onBlur,
    onChange,
    onClick,
    onDelete,
  };
}
