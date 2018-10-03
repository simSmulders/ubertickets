import React from 'react'
import Label from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'

export default function EventForm(props) {
 
  return (<form onSubmit={props.onSubmit}>
    <Label>
      Name:
      <input type="text" name="name" onChange={props.onChange} value={props.values.name} />
    </Label>
    
    <Label>
      Start Date:
      <input type="date" name="startdate" onChange={props.onChange} value={props.values.date} />
    </Label>

    <Label>
      End Date:
      <input type="date" name="enddate" onChange={props.onChange} value={props.values.date} />
    </Label>
    
    <Label>
      Description:
      <input type="text" name="description" onChange={props.onChange} value={props.values.description} />
    </Label>

    <Label>
      Image:
      <input type="text" name="picture_URL" onChange={props.onChange} value={props.values.image} />
    </Label>
    
    <Button type="submit">Save</Button>
  </form>)
}