// src/components/Deck.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

function Deck() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [remaining, setRemaining] = useState(52);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    async function fetchDeck() {
      const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      setDeck(res.data);
    }
    fetchDeck();
  }, []);

  const drawCard = async () => {
    if (remaining === 0) {
      alert("Error: no cards remaining!");
      return;
    }

    const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
    const card = res.data.cards[0];

    setCards(cards => [...cards, card]);
    setRemaining(res.data.remaining);
  };

  const shuffleDeck = async () => {
    setIsShuffling(true);
    const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`);
    setDeck(res.data);
    setCards([]);
    setRemaining(52);
    setIsShuffling(false);
  };

  return (
    <div>
      {deck ? (
        <>
          <button onClick={drawCard} disabled={isShuffling}>Draw a card</button>
          <button onClick={shuffleDeck} disabled={isShuffling}>Shuffle the deck</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        {cards.map(card => (
          <Card key={card.code} image={card.image} />
        ))}
      </div>
    </div>
  );
}

export default Deck;