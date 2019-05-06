import React, { ComponentClass } from 'react';
import TimeInput from "./TimeInput";

interface IProps {
  
}
class ComposedTextField extends React.Component<IProps> {

  render() {

    const regex = [/[0-9]/, /[0-9]/, ":", /[0-5]/, /[0-9]/]; // Max time is 23:59? Min time is 00:00?
    
    return (
      <div>
        <TimeInput value=""
        />
      </div>
    );
  }
}

// (ComposedTextField as ComponentClass<Props>).propTypes = {
//   classes: PropTypes.object.isRequired,
// } as any;

export default (ComposedTextField);
