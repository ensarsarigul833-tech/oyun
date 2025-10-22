import React, { useState, useEffect } from 'react';
import { Heart, Star, Camera, Home } from 'lucide-react';

const Game = () => {
  const [scene, setScene] = useState('menu');
  const [happiness, setHappiness] = useState(50);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [unlockedMemories, setUnlockedMemories] = useState([]);
  const [characterMood, setCharacterMood] = useState('happy');
  const [ensarPos, setEnsarPos] = useState(30);
  const [irmakPos, setIrmakPos] = useState(60);

  const scenes = [
    {
      id: 1,
      title: "Parkta Yıldız İzleme",
      background: "night",
      dialogue: "Irmak, bugün seninle burada olmak harika.",
      character: "ensar",
      choices: [
        { text: "Ben de aynı şeyi hissediyorum 💖", effect: 10, type: "romantic", response: "Gülümsüyor ve elini tutuyor..." },
        { text: "Sessizce yanında oturmak istiyorum 🌙", effect: 0, type: "calm", response: "Başını omzuna yaslar..." },
        { text: "Yine bu konuşmayı yapıyoruz 😒", effect: -15, type: "bad", response: "Üzgün bir ifadeyle bakıyor..." }
      ]
    },
    {
      id: 2,
      title: "Anı Paylaşma",
      background: "sunset",
      dialogue: "Bu fotoğrafa bak... Bunu hatırlıyor musun?",
      character: "irmak",
      choices: [
        { text: "Evet, çok güzeldi 🥰", effect: 10, type: "romantic", response: "O gün çok mutluyduk değil mi?" },
        { text: "Unutmak imkansız 😌", effect: 0, type: "calm", response: "Evet, güzel günlerdi..." },
        { text: "Buna takılmana gerek yok 😑", effect: -15, type: "bad", response: "Fotoğrafı sessizce kaldırır..." }
      ]
    },
    {
      id: 3,
      title: "Gelecek Planları",
      background: "day",
      dialogue: "Gelecekte ne yapmak isteriz?",
      character: "ensar",
      choices: [
        { text: "Birlikte seyahat edelim ✈️", effect: 10, type: "romantic", response: "Harika fikir! Paris'i düşünüyorum..." },
        { text: "Ev alalım 🏡", effect: 5, type: "calm", response: "Güzel bir yer bulabiliriz..." },
        { text: "Ben bilmiyorum, sen hallet 🤷‍♂️", effect: -15, type: "bad", response: "Anlıyorum... Sessizlik çöker..." }
      ]
    },
    {
      id: 4,
      title: "Sürpriz Hediye",
      background: "evening",
      dialogue: "Sana bir şey aldım...",
      character: "irmak",
      choices: [
        { text: "Çok teşekkür ederim! 💝", effect: 10, type: "romantic", response: "Ne kadar düşüncelisin!" },
        { text: "Gerek yoktu aslında 😊", effect: 0, type: "calm", response: "Senin için her şey yaparım..." },
        { text: "Ne alacağını bilmiyorsun ki 🙄", effect: -20, type: "bad", response: "Gözleri dolar, hediyeyi geri alır..." }
      ]
    }
  ];

  const memories = [
    { id: 1, title: "İlk Buluşma", minHappiness: 0, emoji: "💕" },
    { id: 2, title: "Park Yürüyüşü", minHappiness: 30, emoji: "🌳" },
    { id: 3, title: "Yıldızlar Altında", minHappiness: 50, emoji: "⭐" },
    { id: 4, title: "Sürpriz Hediye", minHappiness: 70, emoji: "🎁" },
    { id: 5, title: "Mutlu Son", minHappiness: 85, emoji: "💖" }
  ];

  useEffect(() => {
    if (happiness < 30) setCharacterMood('sad');
    else if (happiness < 60) setCharacterMood('neutral');
    else setCharacterMood('happy');
  }, [happiness]);

  const handleChoice = (choice) => {
    const newHappiness = Math.max(0, Math.min(100, happiness + choice.effect));
    setHappiness(newHappiness);
    
    // Karakterleri hareket ettir
    if (choice.effect > 0) {
      setEnsarPos(45);
      setIrmakPos(55);
    } else if (choice.effect < 0) {
      setEnsarPos(20);
      setIrmakPos(80);
    }

    setTimeout(() => {
      if (sceneIndex < scenes.length - 1) {
        setSceneIndex(sceneIndex + 1);
        setEnsarPos(30);
        setIrmakPos(60);
      } else {
        setScene('ending');
      }
    }, 2500);
  };

  const getBackground = (bgType) => {
    const backgrounds = {
      night: 'linear-gradient(180deg, #0a0e27 0%, #1a1d3a 50%, #2a2550 100%)',
      sunset: 'linear-gradient(180deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)',
      day: 'linear-gradient(180deg, #74b9ff 0%, #a29bfe 50%, #fd79a8 100%)',
      evening: 'linear-gradient(180deg, #fd79a8 0%, #fdcb6e 50%, #6c5ce7 100%)'
    };
    return backgrounds[bgType] || backgrounds.night;
  };

  const CharacterEnsar = ({ mood, position }) => (
    <div style={{ position: 'absolute', left: `${position}%`, bottom: '20%', transition: 'all 0.8s ease' }}>
      <div style={{ width: '120px', textAlign: 'center' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, #8b6f47 0%, #5d4a36 100%)',
          margin: '0 auto 10px',
          position: 'relative',
          border: '3px solid #fff',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}>
          <div style={{ 
            position: 'absolute', 
            top: '25px', 
            left: '20px', 
            width: '12px', 
            height: '12px', 
            background: mood === 'sad' ? '#666' : '#2c3e50',
            borderRadius: '50%',
            animation: mood === 'happy' ? 'blink 3s infinite' : 'none'
          }}/>
          <div style={{ 
            position: 'absolute', 
            top: '25px', 
            right: '20px', 
            width: '12px', 
            height: '12px', 
            background: mood === 'sad' ? '#666' : '#2c3e50',
            borderRadius: '50%',
            animation: mood === 'happy' ? 'blink 3s infinite' : 'none'
          }}/>
          <div style={{ 
            position: 'absolute', 
            bottom: '20px', 
            left: '50%', 
            transform: 'translateX(-50%)',
            width: '30px', 
            height: mood === 'sad' ? '3px' : '15px',
            borderRadius: mood === 'sad' ? '0' : '0 0 15px 15px',
            background: mood === 'sad' ? '#666' : '#e74c3c',
            border: mood === 'sad' ? 'none' : '2px solid #c0392b'
          }}/>
        </div>
        <div style={{ 
          width: '70px', 
          height: '90px', 
          background: 'linear-gradient(180deg, #3498db 0%, #2980b9 100%)',
          margin: '0 auto',
          borderRadius: '10px 10px 40px 40px',
          border: '2px solid #fff'
        }}/>
        <div style={{ color: '#fff', fontWeight: 'bold', marginTop: '8px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Ensar</div>
      </div>
    </div>
  );

  const CharacterIrmak = ({ mood, position }) => (
    <div style={{ position: 'absolute', left: `${position}%`, bottom: '20%', transition: 'all 0.8s ease' }}>
      <div style={{ width: '120px', textAlign: 'center' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, #d4a574 0%, #b8956a 100%)',
          margin: '0 auto 10px',
          position: 'relative',
          border: '3px solid #fff',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}>
          <div style={{ 
            position: 'absolute', 
            top: '20px', 
            left: '15px', 
            width: '25px', 
            height: '30px', 
            background: 'linear-gradient(90deg, #8b6f47 0%, #6b5436 100%)',
            borderRadius: '50% 50% 0 0'
          }}/>
          <div style={{ 
            position: 'absolute', 
            top: '20px', 
            right: '15px', 
            width: '25px', 
            height: '30px', 
            background: 'linear-gradient(90deg, #6b5436 0%, #8b6f47 100%)',
            borderRadius: '50% 50% 0 0'
          }}/>
          <div style={{ 
            position: 'absolute', 
            top: '28px', 
            left: '22px', 
            width: '12px', 
            height: '12px', 
            background: mood === 'sad' ? '#666' : '#5d4037',
            borderRadius: '50%',
            animation: mood === 'happy' ? 'blink 3s infinite' : 'none'
          }}/>
          <div style={{ 
            position: 'absolute', 
            top: '28px', 
            right: '22px', 
            width: '12px', 
            height: '12px', 
            background: mood === 'sad' ? '#666' : '#5d4037',
            borderRadius: '50%',
            animation: mood === 'happy' ? 'blink 3s infinite' : 'none'
          }}/>
          <div style={{ 
            position: 'absolute', 
            bottom: '18px', 
            left: '50%', 
            transform: 'translateX(-50%)',
            width: '32px', 
            height: mood === 'sad' ? '3px' : '16px',
            borderRadius: mood === 'sad' ? '0' : '0 0 16px 16px',
            background: mood === 'sad' ? '#888' : '#ff6b9d',
            border: mood === 'sad' ? 'none' : '2px solid #ff1744'
          }}/>
        </div>
        <div style={{ 
          width: '70px', 
          height: '90px', 
          background: 'linear-gradient(180deg, #ff6b9d 0%, #ff1744 100%)',
          margin: '0 auto',
          borderRadius: '10px 10px 40px 40px',
          border: '2px solid #fff'
        }}/>
        <div style={{ color: '#fff', fontWeight: 'bold', marginTop: '8px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Irmak</div>
      </div>
    </div>
  );

  if (scene === 'menu') {
    return (
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        background: 'linear-gradient(180deg, #0a0e27 0%, #1a1d3a 50%, #2a2550 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes blink {
            0%, 90%, 100% { opacity: 1; }
            95% { opacity: 0; }
          }
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}</style>
        
        {[...Array(50)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: '3px',
            height: '3px',
            background: '#fff',
            borderRadius: '50%',
            animation: `twinkle ${2 + Math.random() * 3}s infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}/>
        ))}

        <div style={{ animation: 'float 3s ease-in-out infinite', marginBottom: '20px' }}>
          <Heart size={80} color="#ff6b9d" fill="#ff6b9d" style={{ filter: 'drop-shadow(0 0 20px #ff6b9d)' }}/>
        </div>
        
        <h1 style={{ 
          color: '#fff', 
          fontSize: '48px', 
          marginBottom: '20px',
          textShadow: '0 0 20px rgba(255,107,157,0.5)',
          fontFamily: 'Georgia, serif'
        }}>
          Ensar'ın Irmak'a Aşkı
        </h1>
        
        <p style={{ color: '#ddd', fontSize: '18px', marginBottom: '40px' }}>
          Seçimlerinle bu aşk hikayesini yönlendir 💕
        </p>
        
        <button
          onClick={() => setScene('game')}
          style={{
            background: 'linear-gradient(135deg, #ff6b9d 0%, #ff1744 100%)',
            color: '#fff',
            border: 'none',
            padding: '15px 40px',
            fontSize: '20px',
            borderRadius: '30px',
            cursor: 'pointer',
            marginBottom: '15px',
            boxShadow: '0 5px 20px rgba(255,107,157,0.4)',
            transition: 'transform 0.2s',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          Hikayeye Başla
        </button>
        
        <button
          onClick={() => setScene('memories')}
          style={{
            background: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)',
            color: '#fff',
            border: 'none',
            padding: '12px 35px',
            fontSize: '18px',
            borderRadius: '30px',
            cursor: 'pointer',
            boxShadow: '0 5px 20px rgba(108,92,231,0.4)',
            transition: 'transform 0.2s',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          <Camera size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }}/>
          Anılarımız
        </button>
      </div>
    );
  }

  if (scene === 'memories') {
    return (
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        background: 'linear-gradient(180deg, #a29bfe 0%, #6c5ce7 100%)',
        padding: '40px',
        overflow: 'auto'
      }}>
        <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '30px', fontSize: '36px' }}>
          💕 Anılarımız 💕
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {memories.map(memory => {
            const isUnlocked = happiness >= memory.minHappiness;
            return (
              <div key={memory.id} style={{
                background: isUnlocked ? 'rgba(255,255,255,0.95)' : 'rgba(100,100,100,0.5)',
                borderRadius: '15px',
                padding: '30px',
                textAlign: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s',
                cursor: isUnlocked ? 'pointer' : 'not-allowed',
                filter: isUnlocked ? 'none' : 'grayscale(100%)'
              }}>
                <div style={{ fontSize: '50px', marginBottom: '15px' }}>
                  {isUnlocked ? memory.emoji : '🔒'}
                </div>
                <h3 style={{ 
                  color: isUnlocked ? '#2d3436' : '#666',
                  marginBottom: '10px'
                }}>
                  {memory.title}
                </h3>
                {!isUnlocked && (
                  <p style={{ color: '#888', fontSize: '14px' }}>
                    Mutluluk {memory.minHappiness}+ gerekli
                  </p>
                )}
              </div>
            );
          })}
        </div>
        
        <button
          onClick={() => setScene('menu')}
          style={{
            background: '#fff',
            color: '#6c5ce7',
            border: 'none',
            padding: '12px 30px',
            fontSize: '18px',
            borderRadius: '30px',
            cursor: 'pointer',
            margin: '30px auto',
            display: 'block',
            fontWeight: 'bold'
          }}
        >
          <Home size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }}/>
          Ana Menü
        </button>
      </div>
    );
  }

  if (scene === 'ending') {
    let ending = {
      title: "Mutlu Son",
      message: "Ensar ve Irmak'ın aşkı her geçen gün daha da güçleniyor! 💖",
      background: 'linear-gradient(180deg, #ff6b9d 0%, #feca57 50%, #48dbfb 100%)'
    };

    if (happiness < 40) {
      ending = {
        title: "Hüzünlü Son",
        message: "Bazı seçimler ilişkiyi zorladı... Belki bir dahaki seferde farklı seçimler yapabilirsin. 💔",
        background: 'linear-gradient(180deg, #636e72 0%, #2d3436 100%)'
      };
    } else if (happiness < 70) {
      ending = {
        title: "Karışık Duygular",
        message: "Ensar ve Irmak'ın ilişkisi iniş çıkışlarla dolu oldu, ama umut hala var. 💙",
        background: 'linear-gradient(180deg, #74b9ff 0%, #a29bfe 100%)'
      };
    }

    return (
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        background: ending.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}>
        <h1 style={{ 
          color: '#fff', 
          fontSize: '48px', 
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          {ending.title}
        </h1>
        
        <div style={{ 
          background: 'rgba(255,255,255,0.9)', 
          padding: '30px', 
          borderRadius: '20px',
          maxWidth: '600px',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <p style={{ fontSize: '20px', color: '#2d3436', marginBottom: '20px' }}>
            {ending.message}
          </p>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: '15px',
            marginTop: '20px'
          }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3436' }}>
              Mutluluk Seviyesi:
            </span>
            <div style={{ 
              width: '200px', 
              height: '30px', 
              background: '#dfe6e9',
              borderRadius: '15px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{ 
                width: `${happiness}%`, 
                height: '100%',
                background: happiness > 70 ? '#00b894' : happiness > 40 ? '#fdcb6e' : '#d63031',
                transition: 'width 1s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>
                  {happiness}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => {
            setScene('menu');
            setSceneIndex(0);
            setHappiness(50);
            setCharacterMood('happy');
            setEnsarPos(30);
            setIrmakPos(60);
          }}
          style={{
            background: '#fff',
            color: '#ff6b9d',
            border: 'none',
            padding: '15px 40px',
            fontSize: '20px',
            borderRadius: '30px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
          }}
        >
          Tekrar Oyna
        </button>
      </div>
    );
  }

  const currentScene = scenes[sceneIndex];

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      background: getBackground(currentScene.background),
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes blink {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0; }
        }
      `}</style>

      {currentScene.background === 'night' && [...Array(30)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: '2px',
          height: '2px',
          background: '#fff',
          borderRadius: '50%',
          animation: `twinkle ${2 + Math.random() * 3}s infinite`,
          animationDelay: `${Math.random() * 2}s`
        }}/>
      ))}

      <div style={{ 
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'rgba(255,255,255,0.9)',
        padding: '15px 25px',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
      }}>
        <Heart size={24} color="#ff6b9d" fill="#ff6b9d"/>
        <div style={{ 
          width: '150px', 
          height: '20px', 
          background: '#dfe6e9',
          borderRadius: '10px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: `${happiness}%`, 
            height: '100%',
            background: happiness > 70 ? '#00b894' : happiness > 40 ? '#fdcb6e' : '#d63031',
            transition: 'width 0.5s ease'
          }}/>
        </div>
        <span style={{ fontWeight: 'bold', color: '#2d3436' }}>{happiness}%</span>
      </div>

      <CharacterEnsar mood={characterMood} position={ensarPos}/>
      <CharacterIrmak mood={characterMood} position={irmakPos}/>

      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'rgba(0,0,0,0.8)',
        padding: '30px',
        borderRadius: '20px 20px 0 0'
      }}>
        <h3 style={{ color: '#fff', marginBottom: '15px', fontSize: '24px' }}>
          {currentScene.title}
        </h3>
        
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '20px',
          fontSize: '18px',
          color: '#2d3436'
        }}>
          {currentScene.dialogue}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentScene.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => handleChoice(choice)}
              style={{
                background: choice.type === 'romantic' ? 'linear-gradient(135deg, #ff6b9d 0%, #ff1744 100%)' :
                           choice.type === 'calm' ? 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' :
                           'linear-gradient(135deg, #636e72 0%, #2d3436 100%)',
                color: '#fff',
                border: 'none',
                padding: '15px 25px',
                fontSize: '16px',
                borderRadius: '15px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                textAlign: 'left',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
