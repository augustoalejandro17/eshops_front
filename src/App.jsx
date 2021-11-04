import './App.css';
import * as React from 'react';
import DefaultAppBar from './components/DefaultAppBar';
import CardComponent from './components/CardComponent';


var cards = [{index: 1, title: 'Card One', description: 'This is a description', image: 'https://source.unsplash.com/random'}, 
                    {index: 2, title: 'Card Two', description: 'This is a description', image: 'https://source.unsplash.com/random'},      
                    {index: 3, title: 'Card Three', description: 'This is a description', image: 'https://source.unsplash.com/random'},
                    {index: 4, title: 'Card Four', description: 'This is a description', image: 'https://source.unsplash.com/random'},
                    {index: 5, title: 'Card Five', description: 'This is a description', image: 'https://source.unsplash.com/random'},
                    {index: 6, title: 'Card Six', description: 'This is a description', image: 'https://source.unsplash.com/random'},
                    {index: 7, title: 'Card Seven', description: 'This is a description', image: 'https://source.unsplash.com/random'},    
                    {index: 8, title: 'Card Eight', description: 'This is a description', image: 'https://source.unsplash.com/random'},
                    {index: 9, title: 'Card Nine', description: 'This is a description', image: 'https://source.unsplash.com/random'}];

const App = (props) => {
    
    return(
        <DefaultAppBar {...props}>
            <main>
                <CardComponent cards={cards}/>
            </main>
        </DefaultAppBar>
    )
}

export default App;
