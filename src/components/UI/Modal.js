import React ,{Fragment} from 'react';
import classes from './Model.module.css';
import ReactDOM from 'react-dom';


/*Now it will create two separate components for debt.

And since they are really closely tied

to this modal component and both very lean

I will treat them here in the same file.

But if you go for a separate files

that of course would also be fine. */

const Backdrop=props=>
{
    return(
        <div className={classes.backdrop} onClick={props.onClick}></div>  //Note onClick event handler is present for all the html elements

    );
};



const ModalOverlay=props=>
{
    return(
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>

    );
};

const PortalElement=document.getElementById('overlays');

const Modal=(props)=> {
    /*here I will have a special markup kind of

because I wanna use React Portal for both my backdrop.

So that thing behind the modal overlay

which blocks interaction with the rest of the page.

And I also wanna render the modal overlay itself

with React Portal to use that component wherever I want

by to render the actual HTML elements

in a specific place in the DOM tree.

That is something you learned about

earlier in the course Portals.

And to render a Portal, we first of all need to go

to the public folder and they are the index HTML file.

And here we got this root div where the overall

React application is being rendered.

And above that route div,

I will add a number div with an ID of over lace.

And that is the div where I wanna Portal my modal

and the backdrop too.

So that is a change we need to make to any HTML.

And with that back in the modal JS file

we can create the backdrop

and the overlay and then use the Portal.

Now it will create two separate components for debt.

And since they are really closely tied

to this modal component and both very lean

I will treat them here in the same file.

But if you go for a separate files

that of course would also be fine.

But I will add the backdrop

component function here in this file.

And then also the modal overlay component function

and both received props because both will receive data.

Now for the backdrop, we return a div with a class name

of classes dot backdrop using that backdrop CSS class

which is defined in the modal module CSS file.

And for the overlay, I will return a div

the class name off clauses dot modal.

And inside of that, I'll have a number div

with a class name of Classes dot content.

I simply have these two devs for styling purposes.

And then inside of that inner div I'll put prompts children.

So in the end, this will be the actual content passed

between the modal opening and closing tax by it

a component where the modal is getting used.

It won't work right now, but it will work in the future.

So now we got these components

now here in the modal function which is the main component

which is being exported here.

We now of course all need to return some markup.

And there, I wanna have backdrop and overlay site by site.

And for this we'll need the fragment.

So I'll import fragment from React

and then simply return fragment.

And in there now backdrop and modal overlay

and this is how we could do it, or actually modal overlay

like this to forward the content between the modal tech. */

  return (
    <Fragment>
        {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />,PortalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,PortalElement)}
    </Fragment>
  );
};

export default Modal;
