import React from 'react';
import classes from './Input.module.css';
import { css } from 'glamor';

const Input = (props) => {

   let inputElement = null;
   const inputClasses = [classes.InputElement]
   const labelClasses = [classes.Label]
   let containerClasses = [classes.InputContainer];

   if(props.invalid && props.shouldValidate && props.touched){
      inputClasses.push(classes.Invalid)
   }
   let styles = null;
   if (props.specialStyle) {
      styles = css(props.specialStyle)

   }


   if (props.disabled) {
      inputClasses.push(classes.InputDisabled)
   }

   if (props.elementConfig.required) {
      inputClasses.push(classes.InputRequired)
      labelClasses.push(classes.RequiredLabel)
   }


   switch (props.elementType) {
      case ('input'):
         switch (props.elementConfig.type) {
            case ('radio'):
               inputElement = (
                  <div
                     onChange={props.changed}
                     value={props.value}
                     className={classes.RadioButtons} >
                     {props.elementConfig.options.map(option => (
                        <div key={option.displayValue} className={classes.EachRadio}>
                           <input
                              key={option.value}
                              name={props.elementConfig.name}
                              value={option.value}
                              className={classes.RadioButton}
                              {...props.elementConfig}
                              type={props.elementConfig.type} />
                           <label className={classes.RadioButtonLabel}>{option.displayValue}</label>
                        </div>
                     ))}
                  </div>)
               break;
            case ('checkbox'):
               inputElement = (
                  <div
                     required={props.elementConfig.required}
                     onChange={props.changed}
                     value={props.value}
                     className={classes.CheckBoxes} >
                     {props.elementConfig.options.map(option => (
                        <div key={option.displayValue} className={classes.EachCheckBox}>
                           <input
                              key={option.value}
                              value={option.value}
                              className={classes.CheckBox}
                              type={props.elementConfig.type} />
                           <label className={classes.CheckBoxLabel}>{option.displayValue}</label>
                        </div>
                     ))}
                  </div>)
               break;
            default:
               inputElement = <input
                  {...props.elementConfig}
                  className={inputClasses.join(' ')}
                  required
                  value={props.value}
                  disabled={(props.disabled) ? "disabled" : ""}
                  onChange={props.changed} />
               break;
         }
         break;


      case ('testarea'):
         inputElement = <textarea
            className={inputClasses.join(' ')}
            {...props.elementConfig} value={props.value}
            disabled={(props.disabled) ? "disabled" : ""}
            onChange={props.changed} />;
         break;
      case ('select'):
         inputElement = (
            <select
               className={inputClasses.join(' ')}
               onChange={props.changed}
               value={props.value}
               disabled={(props.disabled) ? "disabled" : ""}>
               {props.elementConfig.options.map(option => (
                  <option
                     key={option.value}
                     value={option.value}>
                     {option.displayValue} </option>
               ))}</select>);
         break;
      case ('radio'):
         inputElement = (
            <select

               className={inputClasses.join(' ')}
               onChange={props.changed}
               value={props.value}
               disabled={(props.disabled) ? "disabled" : ""}>
               {props.elementConfig.options.map(option => (
                  <input
                     key={option.value}
                     value={option.value}>
                     {option.displayValue} </input>
               ))}</select>);
         break;

      default:
         inputElement = <input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            disabled={(props.disabled) ? "disabled" : ""}
            value={props.value}
            required
            onChange={props.changed} />;
   }

   return (
      <div className={containerClasses.join(' ')}  {...styles}  >
         {(props.label) ? <label className={labelClasses.join(' ')}>{props.label}</label> : null}
         {inputElement}
      </div>
   )
}

export default Input
