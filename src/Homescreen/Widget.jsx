import './Widget.css';

function Widget() {
  return (
    <div className='widget-container'>
      <div className='widget'>
        <div className = "top-bottom">
            <h2>Trending right now:</h2>
        </div>
        <div className = "boxes">
            <p className = 'smol'>Topic · Trending</p>
            <p className = 'bold'>#slay</p>
            <p className = 'smol'>111 posts</p>
        </div>
        <div className = "boxes">
            <p className = 'smol'>Topic · Trending</p>
            <p className = 'bold'>#cool</p>
            <p className = 'smol'>111 posts</p>
        </div>
        <div className = "boxes">
            <p className = 'smol'>Topic · Trending</p>
            <p className = 'bold'>#impressive</p>
            <p className = 'smol'>111 posts</p>
        </div>
        <div className = "boxes">
            <p className = 'smol'>Topic · Trending</p>
            <p className = 'bold'>#pog</p>
            <p className = 'smol'>111 posts</p>
        </div>
        <div className = "boxes">
            <p className = 'smol'>Topic - Trending</p>
            <p className = 'bold'>#nice</p>
            <p className = 'smol'>111 posts</p>
        </div>
        
        <div className = "top-bottom">
            <h2></h2>
        </div>
      </div>
    </div>
  );
}

export default Widget;