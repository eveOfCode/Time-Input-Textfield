import 'react-testing-library/cleanup-after-each'
import React from 'react';
import TimeInput from './TimeInput';
import {cleanup, fireEvent, render} from 'react-testing-library'


const timeInputs = ["1230", "123", "980", "9911", "0989", "9999", "11 1", "1 11", "1  1", "1   ", "11  ", "1", "11" ]

afterEach(cleanup)

// Test #1
test('with a correct time input ie. four characters, hours and minutes correct', () => {
    const { getByTestId } = render(<TimeInput />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: timeInputs[0]}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("1230")
})

// Test #2
test('that the code will insert a colon appropriately with 3 inputs', () => {
    const { getByTestId } = render(<TimeInput  />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: timeInputs[1]}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("0123")
})

// Test #3
test('3 inputs but the minutes is bigger than 59', () => {
    const { getByTestId } = render(<TimeInput />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: timeInputs[2]}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("")
})

// Test #4
test('an hour input that is bigger than 23 hours', () => { 
    const { getByTestId } = render(<TimeInput />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: timeInputs[3]}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("")
})

// Test #5
test('a minute input that is bigger than 59 minutes', () => {
    const { getByTestId } = render(<TimeInput />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: timeInputs[4]}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("")
})

// Test #6
test('a minute and hour input that are both bigger than 59 minutes and 23 hours', () => {
    const { getByTestId } = render(<TimeInput />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: timeInputs[5]}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("")
})

// Test #7
test("there's a space in the user's input", () => {
    const { getByTestId } = render(<TimeInput  />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: "11 1"}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("")
})

// Test #8
test("there's a space in the user's input", () => {
    const { getByTestId } = render(<TimeInput  />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: "1 11"}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("")
})

// Test #9
test("there's a space in the user's input", () => {
    const { getByTestId } = render(<TimeInput  />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: "1  1"}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("")
})

// Test #10
test("there are spaces in the user's input", () => {
    const { getByTestId } = render(<TimeInput  />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: "1   "}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("")
})

// Test #11
test("there are spaces in the user's input", () => {
    const { getByTestId } = render(<TimeInput  />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: "11  "}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("")
})

// Test #12
test("there are no spaces and there's a single input", () => {
    const { getByTestId } = render(<TimeInput  />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: "1"}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("")
})

// Test #13
test("there are no spaces and there are two inputs", () => {
    const { getByTestId } = render(<TimeInput  />)
    fireEvent.blur(getByTestId('TimeInputID'), {target: {value: "11"}}) 
    expect(getByTestId('TimeInputID').getAttribute('value')).toEqual("")
})

// Note: those console.errors show up because jest is 'sensing' the alerts that come up from the code. There are alerts in the TimeInput file
// for when the user inputs an invalid time. Here's a better explanation of what's going on I think: https://stackoverflow.com/questions/55088482/jest-not-implemented-window-alert


