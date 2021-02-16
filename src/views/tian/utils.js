
import React from 'react';
import '../../assets/css/tian.css';
import { Route } from 'react-router-dom'
import { SuspenseImg } from '../../shared/handleDecks';
import { unknownCard } from '../../arrays/cards';

const ChangeGameButton = () => (
  <Route render={({ history }) => (
    <button
      onClick={() => { history.push('/stress') }}
    >
      Change Game
    </button>
  )} />
)

export class Information extends React.Component {
  render() {
    return (
      <div className="paused" onClick={this.props.handlePause}>
        <span className="pausedtext"><h1>Information</h1><h3>Game round</h3>
            Stress is quite special unlike other games. In Stress, both players play at the same time and as fast as they want. Color does not matter in this games.
            <br /><br /><h3>General rules</h3>
            Once the cards in the middle (1 from each deck) are dealt both players can deal their own cards on top of them. But this can only be done if the player's card is a denomination higher or lower than the game stack. So if there is a 4 in one pile and one player has a 5, 6 and a 9 then the player can first put a 5, then a 6. But the player may not add his 9 to the game pile becouse the 9 is not a denomination higher or lower of a 7. Ace counts as 14 and 1 so you can only add it on a king or a 2.
            <br /><br /><h3>Refilling of cards</h3>
            When you lay cards, new cards from the player's deck of cards will move to your action cards.
            <br /><br /><h3>Stress</h3>
            If both cards in the middle have equal numbers a "STRESS" button will be displayed at a random position. Hit the button and your enemy will gets both piles added to their deck.
            <br /><br /><h3>Goal</h3>
            To get rid of all your cards.
            <br /><h2>Click anywhere to unpause.</h2></span>
      </div>
    )
  }
};

export class DeckCard extends React.Component {
  render() {
    return (
      <img id="card-3-2" src={this.props.card.src} className="deckcard" style={{ marginTop: "-" + (this.props.length * 2) + "px", marginLeft: "-" + this.props.length + "px", position: "absolute" }} alt="card" draggable="false" />
    )
  }
};

export class CardMenu extends React.Component {
  render() {
    return (
      <div className="cardmenu">
        {/* <button onClick={showReport}>{"my s: " + deck.mySlop.length + " your s: " + deck.yourSlop.length + " my: " + deck.myDeck.length + " y: " + deck.yourDeck.length +
            " c: " + deck.cards.length + " total: " + (deck.mySlop.length + deck.yourSlop.length + deck.myDeck.length + deck.yourDeck.length + deck.cards.length)}</button> */}

        <ChangeGameButton />
        <button className={this.props.paused ? "btnpressed btnpaused" : ""} onClick={this.props.handlePause}>Information</button>
        <button className={this.props.botLevel === 5000 ? "btnpressed" : ""} onClick={this.props.handleLevel(5000)}>Easy</button>
        <button className={this.props.botLevel === 3700 ? "btnpressed" : ""} onClick={this.props.handleLevel(3700)}>Medium</button>
        <button className={this.props.botLevel === 2400 ? "btnpressed" : ""} onClick={this.props.handleLevel(2400)}>Hard</button>
        <button className={this.props.botLevel === 1100 ? "btnpressed" : ""} onClick={this.props.handleLevel(1100)}>Extreme</button>

      </div>
    )
  }
}

export class Pile extends React.Component {
  render() {
    return (<>
      {this.props.pile.length > 0 ? this.props.pile.map((item, i) => {
        if (this.props.drag && i !== 0) {
          return <SuspenseImg src={item.src} key={"pile-" + this.props.nr + "-" + i} id={"pile-" + this.props.nr + "-" + i} className="deckcard move invisible" style={{ marginLeft: (i * 8) + "px", positon: "absolute"}} alt="card" draggable="true" onDragStart={this.props.drag} onClick={this.props.drag} />
        } else {
          return <SuspenseImg src={i === 0 || this.props.enemy ? unknownCard.src : item.src} key={"pile-" + this.props.nr + "-" + i} id={"pile-" + this.props.nr + "-" + i} className="deckcard move invisible" style={{ marginLeft: (i * 8) + "px", positon: "absolute"}} alt="card" draggable="false" />
        }
      })
        : ""}
    </>)
  }
};

export class MyPile extends React.Component {
  render() {
    return (<>
      {this.props.pile.length > 0 ? this.props.pile.map((item, i) => {
          return <SuspenseImg src={item.src} key={"pile-" + this.props.nr + "-" + i} id={"pile-" + this.props.nr + "-" + i} className="deckcard move invisible" style={{ marginLeft: (i * 24) + "px", positon: "absolute"}} alt="card" draggable="true" onDragStart={this.props.drag} onClick={this.props.drag} />
      })
        : ""}
    </>)
  }
};

export class Target extends React.Component {
  render() {
    return (
      <div id="card-target" className="card-element target" onDrop={this.props.drop} onDragOver={this.props.allowDrop} onClick={this.props.drop}>
        {this.props.target.length > 0 ? this.props.target.map((item, i) => {
          return <SuspenseImg src={item.src} key={"card-target-" + i} className="deckcard" style={{ marginTop: "-" + (i * 2) + "px", marginLeft: "-" + i + "px" }} alt="card" draggable="false" />
        })
          : ""}
      </div>
    )
  }
}