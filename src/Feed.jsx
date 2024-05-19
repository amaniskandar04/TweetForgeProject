import './Feed.css'
import Box from './Box.jsx'
import Tweetbox from './Tweetbox.jsx'
import Post from './Post.jsx'

function Feed(){
    return(
        <div className = 'feed'>
            <div className = 'feed__header'>
                <h2> TweetForge Test Area </h2>              
            </div>
            
            <Tweetbox />

            <Post username = 'Chiang_Kai_Shek' text = '2024 年全国编程联盟是 PEKOM 历史上最好的赛事。'/>
            <Post username = 'Mai_Sakurajima' text = 'ワイフが現実にいたら世界はもっと良くなるだろう。私はワイフが大好きです.'/>
            <Post username = 'amanepic_69' text = 'I love having to do Data Structures. This way I can get a fast track path to a McDonalds or a dishwashing job!'/>
            <Post username = 'epic_gamr' text = 'The Communist Manifesto (German: Das Kommunistische Manifest), originally the Manifesto of the Communist Party (Manifest der Kommunistischen Partei), is a political pamphlet written by Karl Marx and Friedrich Engels, commissioned by the Communist League and originally published in London in 1848. The text is the first and most systematic attempt by Marx and Engels to codify for wide consumption the historical materialist idea that "the history of all hitherto existing society is the history of class struggles", in which social classes are defined by the relationship of people to the means of production. Published amid the Revolutions of 1848 in Europe, the Manifesto remains one of the worlds most influential political documents.'/>
            <Post />
            <Post />
            
            
        </div>
    );
}

export default Feed