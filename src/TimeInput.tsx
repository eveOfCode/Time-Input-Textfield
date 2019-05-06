import React from "react";
import FormControl from '@material-ui/core/FormControl';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import MaskedInput from 'react-text-mask';

// To do: Regex

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
    },
  });

type maskArray = Array<string | RegExp>;

interface ITimeInputProps extends WithStyles<typeof styles>{
    classes: any;
    value?: string;
    // timeRegex?: RegExp;
    mask?: maskArray | ((value: string) => maskArray);
    guide?: boolean;
    placeholderChar?: string;
    keepCharPositions?: boolean;
    // pipe?: (
    //     conformedValue: string,
    //     config: any
    // ) => false | string | { value: string; indexesOfPipedChars: number[] };
    showMask?: boolean;
    // render?: (ref: (inputElement: HTMLElement) => void, props: any) => any;
}

interface ITimeInputState {
    value: string;
    // timeRegex: RegExp;
}

class TimeInput extends React.Component<ITimeInputProps, ITimeInputState> {
    constructor(props: ITimeInputProps) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            value: (this.props.value) ? this.props.value : ""
            // timeRegex: (this.props.timeRegex) ? this.props.timeRegex : [/[0-9]/, /[0-9]/, ":", /[0-5]/, /[0-9]/]
        }
        // this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const { classes } = this.props;
        const timeRegex = [/[0-9]/, /[0-9]/, ":", /[0-5]/, /[0-9]/]; // Max time is 23:59? Min time is 00:00?

        const handleChange = (event: any) => {
            this.setState({ value: event.target.value });
        };

        const handleBlur = (event: any) => {
            const inputStr = event.target.value.replace(":", "").trim();
            let hours = parseInt(inputStr.slice(0, -2));
            let str = inputStr;

            // const regex = /(0[0-9]|1[0-9]|2[0-3]|[0-3]):[0-5][0-9]/g;
            // const found = str.match(regex);

            // To do: 'Invalid input'
            // Example: (highest error value) '29:00', '29:0', and '29' should alert

            // If the user inputed 4 integers then onBlur shouldn't change the value
            // Example: before the code was doing, when input was '1', then -> '01:00' -> '00:10' -> '00:01' when onBlur happened
            if (str.length == 4) {
                this.setState({ value: str });
            }
            else {
                // Example: '123' becomes '01:23'
                if (hours < 10) {
                    str = "0" + str;
                    this.setState({ value: str });

                }
                // Examples: '1' becomes '01:00' and '12' becomes '12:00'
                else if (isNaN(hours)) {
                    if (inputStr.length == 1) {
                        str = "0" + str + "00";
                    }
                    str = str + "00";
                    this.setState({ value: str });

                }
            }
        };

        return (
            <div className={classes.container}>
                <FormControl className={classes.formControl} variant="outlined">
                    <MaskedInput
                        onChange={handleChange}
                        mask={timeRegex}
                        // mask={this.state.timeRegex}
                        onBlur={handleBlur}
                        placeholderChar={'\u2000'} // Removes underlines
                        showMask
                        value={this.state.value}
                    />
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles)(TimeInput);
