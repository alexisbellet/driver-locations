import React, { PureComponent } from 'react';
import styles from './Form.module.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import { calculateTimeLeft, formatTime } from '../helpers';

class Form extends PureComponent {
    render() {
        const { driver, availableLegs, changeHandler, saveHandler } = this.props;
        return (
            <form className={styles.form}>
                <h2 className={styles.formTitle}>Details of our main guy!</h2>
                <FormControl className={styles.formElement}>
                    <InputLabel htmlFor="active-leg">Active Leg</InputLabel>
                    <Select
                        value={driver.activeLegID ? driver.activeLegID.legID : ""}
                        onChange={changeHandler}
                        input={<Input name="activeLegID" id="active-leg" />}
                    >
                        {availableLegs ? availableLegs.map((leg, index) => <MenuItem key={`${leg.legID}${index}`} value={leg.legID}>{leg.legID}</MenuItem>) : null}
                    </Select>
                    <FormHelperText>The new active leg for the driver</FormHelperText>
                </FormControl>

                <FormControl className={styles.formElement}>
                    <label htmlFor="progress" className={styles.formElementLabel}>Leg Progress</label>
                    <Slider
                        className={styles.formSlider}
                        id="progress"
                        value={driver.legProgress ? driver.legProgress : 0}
                        max={100}
                        min={0}
                        step={1}
                        aria-labelledby="label"
                        onChange={changeHandler}
                    />
                    <FormHelperText>The percentage of the leg already accomplished by the driver</FormHelperText>
                </FormControl>

                <div className={`${styles.dataContainer} ${styles.formElement}`}>
                    <b>Active Leg:</b> {driver.activeLegID ? driver.activeLegID.legID : ""} <br />
                    <b>Leg Progress:</b> {driver.legProgress ? driver.legProgress : 0}% <br />
                    <b>Time Left to complete full path:</b> <br />
                    {driver.activeLegID && availableLegs ? formatTime(calculateTimeLeft(driver, availableLegs)) : ""}
                </div>

                <Button className={styles.formElement} variant="contained" onClick={saveHandler}>Save</Button>

            </form>
        )
    }
}

export default Form;