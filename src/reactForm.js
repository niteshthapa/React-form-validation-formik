import React from 'react';
import { Formik, Form,ErrorMessage,FieldArray  } from 'formik';
import * as Yup from 'yup';
import {InputText} from 'primereact/inputtext';
import {RadioButton} from 'primereact/radiobutton';
import {Rating} from 'primereact/rating';
import {Spinner} from 'primereact/spinner';
import {InputMask} from 'primereact/inputmask';
import {Checkbox} from 'primereact/checkbox';
import {Dropdown} from 'primereact/dropdown';
import {Slider} from 'primereact/slider';
import {AutoComplete} from 'primereact/autocomplete';
import {InputTextarea} from 'primereact/inputtextarea';
import {Calendar} from 'primereact/calendar';
import {Chips} from 'primereact/chips';
import {Growl} from 'primereact/growl';
import {ProgressSpinner} from 'primereact/progressspinner';
class ReactForm extends React.Component {
  constructor() {
    super();
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
  }
  showSuccess() {
    this.growl.show({severity: 'success', summary: 'Success', detail: 'Form submitted successfully'});
  }
  showError() {
    this.growl.show({severity: 'error', summary: 'Error Message', detail: 'Validation failed'});
}
    render() {
      //Yup schema
        const SignupSchema = Yup.object().shape({
           fname: Yup.string()
              .required('First Name is Required')
              .matches(/^[a-zA-Z]+$/,"Number and special character is not  allowed")
              .min(3, 'Miminum 3 charagter needed')
              .max(50, 'Maximum 50 charagter needed'),
              lname: Yup.string()
              .required('Last Name is Required')
              .matches(/^[a-zA-Z]+$/,"Number and special character is not  allowed")
              .min(3, 'Miminum 3 charagter needed')
              .max(50, 'Maximum 50 charagter needed'),
              email: Yup.string()
              .email('Invalid email')
              .required('Email is Required'),
              gender: Yup.string()
              .required('Gender is Required'),
              rating: Yup.number()
              .moreThan(0,"Rating is Required"),
              age: Yup.number()
              .typeError('age must be a number')
              .min(10,"Age should not be less than 10")
              .max(20,"Age should be more than 20"),
              password: Yup.string()
              .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
              .required("Password is required"),
              phone: Yup.string()
              .required('99-9999-9999 format is Required'),
              cities: Yup.array()
              .required('City is Required'),
              language: Yup.string()
              .required('At least one Language'),
              slide: Yup.number()
              .moreThan(0,"Range is Required"),
              country: Yup.string()
              .required("Country is Required"),
              comment: Yup.string()
              .required("Comment is Required"),
              dob: Yup.string()
              .required("DOB is Required"),
              multiValue: Yup.array()
              .min(2,"At least two value is required")
          });

          //Values for dropdown
          const languageSelectItems = [
            {label: 'Javascript', value: 'JS'},
            {label: 'PHP', value: 'PHP'},
            {label: 'Java', value: 'JAVA'},
            
        ];
        //Values for city
          const cityList = ["London","Paris","Ottawa"];
          //Values for country
         const countryList =["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
         ,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands"
         ,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
         ,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
         ,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
         ,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
         ,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
         ,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
         ,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
         ,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
         ,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
         ,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
         ,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia"
         ,"Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay"
         ,"Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

        return(
          <>
            {/* This growl is visible(alert message) when form is submitted successfully  */}
           <Growl ref={(el) => this.growl = el} />
          <Formik 
// Initial value set here Formik way
    initialValues={{
            fname:"",
            lname:"",
            email:"",
            gender:"",
            rating:0,
           age:0,
            password:"",
            phone:"",
            cities:[ ],
            language:"",
            slide:0,
            country:"",
            countrySuggestion :[ ],
            comment:"",
            dob:"",
            multiValue:[]
                      
          }}
          validationSchema={SignupSchema}
          // After form is submitted this Formik onSubmit function is called
          //setTime out is writtern to test the code for Growl component
          onSubmit={(values, actions,isValid) => {
            setTimeout(() => {
              console.log(values)
              actions.setSubmitting(false)
              actions.resetForm();
              this.showSuccess()
            }, 1000);
           
           
        }}
        //Render part of Formik form
          render={({ handleChange,  values,setFieldValue,isValid,isSubmitting }) => (
            <Form>
              {/* Showing form is valid or not in UI in top and bottom*/}
               <h3>{ isValid ? "Form is valid" : "Form is not valid"}</h3>
          
          <div className="form-group">
          <label className="font-weight-bold mb-0">First Name</label>
           <InputText autoComplete="off"  placeholder="First Name" name="fname" value={values.fname}  className="form-control"  onChange={handleChange} />
          <ErrorMessage name="fname">{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
          </div>
          <div className="form-group">
          <label  className="font-weight-bold mb-0">Last Name</label>
          <InputText autoComplete="off" placeholder="Last Name" name="lname" value={values.lname}  className="form-control" onChange={handleChange} />
          <ErrorMessage name="lname">{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
        </div>

        <div className="form-group">
          <label  className="font-weight-bold mb-0">Email</label>
          <InputText placeholder="Email" name="email" type="email" value={values.email}  className="form-control" onChange={handleChange} />
          <ErrorMessage name="email">{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
       </div>
        <div className="form-group">
          <label  className="font-weight-bold mb-0">Gender</label>
          <div className="p-col-12">
          <RadioButton inputId="rb1" name="gender" value="Male"  onChange={handleChange} checked={values.gender === 'Male'} />
          <label htmlFor="rb1" className="p-radiobutton-label">Male</label>
          <RadioButton inputId="rb2" name="gender" value="Female"  onChange={handleChange} checked={values.gender === 'Female'} />
          <label htmlFor="rb1" className="p-radiobutton-label">Female</label>
        </div>
          <ErrorMessage name="gender">{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
        </div>

        <div className="form-group">
          <label  className="font-weight-bold mb-0">Select you rating</label>
          <Rating value={values.rating} name="rating" cancel={false}  onChange={handleChange} />
          <ErrorMessage name="rating">{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
        </div>

        <div className="form-group">
          <label  className="font-weight-bold mb-0">Age</label>
          <Spinner  className="p-fluid w-100"   name="age" value={values.age} min={0} max={100}  onChange={handleChange} />
          <ErrorMessage name="age">{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
           </div>
           <div className="form-group">
          <label  className="font-weight-bold mb-0">Password</label>
          <InputText  placeholder="Password" name="password" type="password" value={values.password}  className="form-control" onChange={handleChange} />
          <ErrorMessage name="password">{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
        </div>

        <div className="form-group">
          <label  className="font-weight-bold mb-0">Phone Number</label>
        <InputMask className="w-100" name="phone" mask="99-9999-9999" placeholder="99-9999-9999" value={values.phone} onChange={handleChange}></InputMask>
        <ErrorMessage name="phone">{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
        </div>

        <div className="form-group">
          {/* For array */}
        <FieldArray
        name="cities"
        render={arrayHelpers => (
        <div>
            {cityList.map((city,index) => (
                     <div className="p-col-12" key={index}>
                <Checkbox 
                 onChange={e => {
                  if (e.checked) {
                    arrayHelpers.push(e.value);
                  } else {
                    const idx = values.cities.indexOf(e.value);
                    arrayHelpers.remove(idx);
                  }
                }}
                value={city} checked={values.cities.includes(city)}></Checkbox>
                 <label htmlFor="cb1" className="p-checkbox-label">{city}</label>
                </div>
            ))}
        </div>
         )}
        />
      <ErrorMessage name="cities">{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
     </div>
          
     <div className="form-group">
          <label  className="font-weight-bold mb-0">Select Country</label>
          <AutoComplete  minLength={1} className="w-100 p-fluid"  name="country" value={values.country} placeholder="Type Country"   onChange={(e) => handleChange(e)} 
            suggestions={values.countrySuggestion} completeMethod={(e)=>{
                let results = countryList.filter((country) => {
                     return country.toLowerCase().startsWith(e.query.toLowerCase());
                });
                setFieldValue('countrySuggestion', results)
           }} />
          <ErrorMessage name="country">{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
        </div>

      <div className="form-group">
          <label  className="font-weight-bold mb-0">Select Range</label>
          <h5>Basic: {values.slide}</h5>
           <Slider   name="slide" value={values.slide} onChange={(e) => setFieldValue('slide', e.value)} />
          <ErrorMessage name="slide">{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
        </div>

        <div className="form-group">
          <label  className="font-weight-bold mb-0">Comment</label>
          <InputTextarea className="w-100" placeholder="Enter few comments" name="comment" rows={5} cols={30} value={values.comment} onChange={handleChange} />
          <ErrorMessage name="comment">{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
        </div>

        <div className="form-group">
          <label  className="font-weight-bold mb-0">DOB</label>
          <Calendar readOnlyInput={true} className="w-100 p-fluid" placeholder="99/99/9999" name="dob" value={values.dob} onChange={handleChange} monthNavigator={true} yearNavigator={true} yearRange="2010:2030" />
          <ErrorMessage name="dob">{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
        </div>

        <div className="form-group">
          <label  className="font-weight-bold mb-0">Select Language</label>
          <Dropdown className="w-100" name="language" value={values.language} options={languageSelectItems} onChange={handleChange} placeholder="Select a Language"/>
          <ErrorMessage name="language">{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
        </div>
       
        <div className="form-group">
          <label  className="font-weight-bold mb-0">Add multiple Value (Hit enter)</label>
          <Chips className="w-100 p-fluid" name="multiValue" value={values.multiValue} onChange={handleChange} ></Chips>
          <ErrorMessage name="multiValue">{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
        </div>
       
        <button className="btn btn-primary"  disabled={isSubmitting} type="submit"> Submit</button>{isSubmitting === true && <ProgressSpinner style={{width: '30px', height: '30px'}} fill="#fff"  />}
        <h3>{ isValid ? "Form is valid" : "Form is not valid"}</h3>            </Form>
         
          )}
        />
        </>
        )
    }
  }
export default ReactForm;