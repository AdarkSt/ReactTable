import React, { useState } from "react";
import "./Form.css"
import {Input} from "../../Material/Inputs/Input/Input.js"
import {Button} from "../../Material/Inputs/Button/Button.js"
import defaultPhoto from "../../../Assets/Images/userPhoto.png"
import { validateForm } from "./Utils/Validation";
import _ from "lodash";


export const Form = props =>{
    const {handleCreate} = props
    const initialValue = {...{first_name:"", last_name:"", age:"", photo: ""}, ...props.initialValue}

    const [user, setUser] = useState(initialValue)    
    const [photo, setPhoto] = useState(defaultPhoto)
    const [errors, setErrors] = useState({})


    const handleChange = e => {
        const inputName = e.target.name;
        const inputValue = e.target.value
        setUser(prevUser => ({...prevUser, [inputName]:inputValue}))
        setErrors({})
    }

    const handleFileChange = e =>{
        const name = e.target.name;
        const file = e.target.files[0]

        const img = URL.createObjectURL(file)
        
        setPhoto(img)
        setUser(prevUser => ({...prevUser, [name]:file}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let hasError = false;
        const errors = validateForm(user)
        
        if(!_.isEmpty(errors)) {
            hasError = true;
            setErrors(errors)
        }
        if(!hasError){ 
            handleCreate(user, (errors, response) => {
                if(!_.isEmpty(errors)){
                    setErrors(errors);
                }
            });
        }
    }

    const handleReset = () => {
        setPhoto(defaultPhoto)
        setUser(initialValue);
    }

    return (
        <div className="form">
            <img src={photo} alt="User" className="userPhoto"/>
            <form onSubmit={handleSubmit} onReset={handleReset} className="row g-3 needs-validation" noValidate>
                <Input className="col-md-12" error={errors.first_name} type="text" label="First Name*" name="first_name" onChange={handleChange}  value={user.first_name}/>
                <Input className="col-md-12" error={errors.last_name} type="text" label="Last Name*" name="last_name" onChange={handleChange}  value={user.last_name}/>
                <Input className="col-md-12" error={errors.age} type="number" label="Age*" name="age" onChange={handleChange}  value={user.age}/>
                <Input className="col-md-12" type="file" label="Photo" name="photo" onChange={handleFileChange}/> 
                <div className="col-12">
                    <Button className="btn btn-primary" type="submit" title="Create"/>
                    <Button className="btn btn-secondary btn-sm" type="reset" title="Reset"/>
                </div>
            </form>
        </div>
        
    )
}