export function useInputEvents(props) {
  const onSelect = (value) => {
    if (!props.events || !("onSelect" in props.events)) return;

    props.events.onSelect(value);
  };

  const onBlur = (value) => {
    if (!props.events || !("onBlur" in props.events)) return;

    props.events.onBlur(value);
  };
  const onChange = (value) => {
    if (!props.events || !("onChange" in props.events)) return;

    props.events.onChange(value);
  };

  const onClick = (value) => {
    if (!props.events || !("onClick" in props.events)) return;

    props.events.onClick(value);
  };

  const onDelete = (value) => {
    if (!props.events || !("onDelete" in props.events)) return;

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
