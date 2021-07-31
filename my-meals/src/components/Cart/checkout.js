import { useRef, useState } from 'react';
import classes from './checkout.module.scss';
const isEmpty = (value) => value.trim() === '';
const isTenChars = (value) => value.trim().length === 10;

const Checkout = (props) => {
    const [formValidity, setFormValidity] = useState({
        name: true,
        mobile: true,
        address: true,
        city: true,
        locality: true
    });
    // const [formValue, setFormValue] = useState({
    //     name: '',
    //     mobile: '',
    //     address: '',
    //     city: '',
    //     locality: '',
    // });
    const nameRef = useRef();
    const mobileRef = useRef();
    const addressRef = useRef();
    const localityRef = useRef();
    const cityRef = useRef();

    const submitHandeler = (event) => {
        event.preventDefault();
        const form = {
            name: nameRef.current.value,
            address: addressRef.current.value,
            mobile: mobileRef.current.value,
            locality: localityRef.current.value,
            city: cityRef.current.value
        }
        // setFormValue({
        //     ...form
        // })

        const nameIsValid = !isEmpty(form.name);
        const addressIsValid = !isEmpty(form.address);
        const cityIsValid = !isEmpty(form.city);
        const mobileIsValid = isTenChars(form.mobile);
        const localityIsValid = !isEmpty(form.locality)

        setFormValidity({
            name: nameIsValid,
            mobile: mobileIsValid,
            address: addressIsValid,
            city: cityIsValid,
            locality: localityIsValid,
        });

        const formIsValid =
            nameIsValid &&
            addressIsValid &&
            mobileIsValid &&
            cityIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm(form)
    }

    const inValidCss = (isValid) => {
        return `${classes.control} ${isValid ? '' : classes.invalid}`;
    }

    return <form onSubmit={submitHandeler} className={classes.form}>
        <div className={inValidCss(formValidity.name)}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" ref={nameRef} />
            {!formValidity.name && <p>Please enter a valid name!</p>}
        </div>
        <div className={inValidCss(formValidity.mobile)}>
            <label htmlFor="mobile">Mobile</label>
            <input type="number" id="mobile" ref={mobileRef} />
            {!formValidity.mobile && <p>Please enter a valid mobile!</p>}
        </div>
        <div className={inValidCss(formValidity.address)}>
            <label htmlFor="address" >Address <small>House No, street, Area</small></label>
            <input type="text" id="address" ref={addressRef} />
            {!formValidity.address && <p>Please enter a valid address!</p>}
        </div>
        <div className={classes.control}>
            <label htmlFor="locality">Locality/Town</label>
            <input type="text" id="locality" ref={localityRef} />

        </div>
        <div className={inValidCss(formValidity.city)}>
            <label htmlFor="city">City</label>
            <input type="text" id="city" ref={cityRef} />
            {!formValidity.city && <p>Please enter a valid city!</p>}
        </div>
        <div className={classes.actions}>
            <button type="button" className={classes["button--alt"]} onClick={props.onCancel}>Cancel</button>
            <button type="submit" className={classes.button}>Confirm</button>
        </div>
    </form>
}

export default Checkout;