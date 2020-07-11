import { useRef, useEffect, useContext } from "react";
import { InputsContext } from "../context/InputsContext";
import validateInput from '../logic/validateInput';

const useInputs = () => {
  const { inputs, updateInputs } = useContext(InputsContext);
  // const inputsRef = useRef({});
  console.log('useInputs called!');
  // console.log(inputsRef.current);
  // const inputsTempRef = useRef({});
  // const setRef = useCallback(node => {
  //   if (node) {
  //     const input = {...inputObj.current}
  //     input.node = node;
  //     inputsRef.current.push(input)
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log('inputsRef Effect fired!');
  //   console.log(inputsRef.current);
  //   const inputsArray = Object.values(inputsRef.current); // need to change inputs to a set to guaruntee order when converted to array
  //   console.log('setInputs to be called with inputsArray:')
  //   console.log(inputsArray);
  //   setInputs(inputsArray);
  // }, [inputsRef.current]);

  const registerInput = (iconClassName, validationCriteria = { required: true }) => {
    // if (inputsRef.current.hasOwnProperty(inputName)) {
    //   console.log('register input skipped!');
    //   return;
    // }
    // associate page number, icon, input validation, error message and focusing input ref on error
    const input = {
      iconClassName,
      validationCriteria,
      validate: function () {
        return validateInput(this.node, this.validationCriteria);
      },
    }
    return node => {
      console.log('Ref callback run with node:');
      console.log(node);
      if (node) {
        input.node = node;
        updateInputs(input);
        // inputsRef.current[node.name] = input;
        // console.log('input registered! inputsref.current:')
        // console.log(inputsRef.current)
      }
    };
  }

  return [
    inputs,
    registerInput,
  ]
}

export default useInputs;