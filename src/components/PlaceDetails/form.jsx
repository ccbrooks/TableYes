import { Button, Dialog, DialogTitle, DialogContent, 
    DialogContentText, DialogActions, TextField, Radio,
    RadioGroup, FormControlLabel, Select, MenuItem, CardMedia} from '@material-ui/core'
import {Form} from 'react-bootstrap'
import axios from 'axios'
import { useState } from 'react'
import useStyles from './styles-form';
import { restaurant } from "../../api/index.js"



export const ReserveForm = ({place}) => {

    const classes = useStyles();
    // restaurant(pass), lat(pass), lng(pass), name, size, time, comments 

    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [restaurantID, setRestaurantID] = useState('');
    const [size, setSize] = useState('');
    const [time, setTime] = useState('');
    
    const [open, setOpen] = useState(false);

    // store and pass token
    const handleSubmit = async () => {
        setOpen(false)
        axios.post("https://tjcc5pqmel.execute-api.us-east-1.amazonaws.com/dev/reservations", 
        {
            token: localStorage.getItem("accessToken"), // token
            restaurantID: place.location_id, // string
            time: time, // string
            partySize: size, // int
        },
        {
            headers: {
                "Authorization": `${localStorage.getItem('idToken')}`
            }
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }

    const restaurantSubmit = async () => {
        axios.post("https://tjcc5pqmel.execute-api.us-east-1.amazonaws.com/dev/restaurants", 
        {
            "fullname" : place.name,
            "email" : "testz@simulator.amazonses.com", // string
            "lat" : place.latitude, 
            "long" : place.longitude,
            "token" : localStorage.getItem('accessToken')
        }, 
        {
            headers: {
                "Authorization": `${localStorage.getItem('idToken')}`
            }
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }

    const restaurantGo = async () => {
        try {
            await restaurant({
                "fullname" : place.name,
                "email" : "testing@simulator.amazonses.com", // string
                "lat" : place.latitude, 
                "long" : place.longitude,
                "token" : localStorage.getItem('accessToken')
            });
        } catch (error) {
            console.log(error);
          }
    };
    
    const handleChange = (e) => {
        setSize(e.target.value);
    };

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Book Now</Button>
            <Dialog 
                open = {open} 
                onClose={() => setOpen(false)} 
                aria-labelledby='dialog-title' 
                ariadescribedby='dialog-description'
            >
                <Form>
                    <DialogTitle className={classes.DialogTitle}>{place.name || 'Test'} | {place.address || '1234 Street'}</DialogTitle>
                    <CardMedia
                        style={{ height: 300 }}
                        image={'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                        title={place.name}
                    />
                    <DialogTitle className={classes.DialogTitle}>Reservation Details</DialogTitle>
                        <TextField // Name
                            className={classes.TextField} 
                            required
                            id="outlined-required" 
                            type="required" 
                            label="Full Name"
                            value={name}
                            onChange = {(e) => setName(e.target.value)}
                        /> 
                    <DialogTitle className={classes.DialogTitle}>Party Size</DialogTitle>
                        <Select // Size
                            className = {classes.Select}
                            required
                            labelId="party-size-select"
                            id="party-size-select"
                            value={size}
                            label="Size"
                            onChange= {(e) => setSize(e.target.value)}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                        </Select>
                        <DialogTitle className={classes.DialogTitle}>Time</DialogTitle>
                            <TextField
                                className={classes.TextField} // Time Select
                                required
                                id="time"
                                type="time"
                                defaultValue="19:30"
                                value={time}
                                onChange = {(e) => setTime(e.target.value)}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                inputProps={{
                                step: 300, // 5 min
                                }}
                                autoWidth
                            />
                        <DialogTitle className={classes.DialogTitle}>Comments</DialogTitle>
                        <TextField className={classes.TextField} // Comment field
                            autoFocus
                            margin="dense"
                            id='dialog-title'
                            label="Write a note here..."
                            type="text"
                            variant="standard"
                            value={comment}
                            onChange = {(e) => setComment(e.target.value)}
                        />  
                        <DialogContent>
                            <DialogContentText id='dialog-description'>Please arrive at least 10 minutes before your reserved time.</DialogContentText>
                        </DialogContent>
                    <p>{localStorage.getItem("accessToken")} and {place.name} and {place.latitude} and {place.longitude} and key: {place.location_id}</p>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button variant='outlined' onClick={handleSubmit}>Submit</Button>
                        <Button onClick={restaurantGo}>Test</Button>
                    </DialogActions>
                </Form>
            </Dialog>
        </div>
        
    )
}