import './Box.css'

function Box(props){
    return(
        <>
            <div className = "box">
                <p> {props.accName} </p> 
                <p> {props.comment}</p>
            </div>
        </>
    )
}

export default Box