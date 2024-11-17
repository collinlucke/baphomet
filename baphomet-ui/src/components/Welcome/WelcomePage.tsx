import { Button, InnerWidth, Block, Header } from '@collinlucke/phantomartist';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const WelcomePage = () => {
  const navigate = useNavigate();
  const beenHereBefore = localStorage.getItem('beenHereBefore');
  const navigateToList = () => {
    navigate('/movielist');
  };

  useEffect(() => {
    if (beenHereBefore === 'yup') {
      navigateToList();
    } else {
      localStorage.setItem('beenHereBefore', 'yup');
    }
  }, [beenHereBefore, navigate]);

  if (beenHereBefore) {
    return null;
  }

  return (
    <Block className={baphStyles}>
      <Header className={baphStyles}>
        <>
          <h1>WELCOME!!!</h1>
          Looks like you might be new around here...
        </>
      </Header>
      <div css={baphStyles.imgWrapper}>
        <img
          src="baphy-full-transparent.png"
          alt="Picture of a cuddly little demon"
        />
      </div>
      <InnerWidth className={baphStyles}>
        <p>
          If you've reached this page, Hello! I'm Collin Lucke, I'm a Frontend
          Software Engineer, and you've stumbled upon my little pet project,
          Baphomet. Don't worry, it's not an app that sends you to hell - that's
          TicTok. This guy, as of now, displays a list of movies (like, only a
          couple at the time of writing this) and you can click on one to get
          more info. As you'll see it's still very rough around the edges. VERY
          rough around the edges.
        </p>
        <p>
          On the frontend it's a React/Typescript Vite app using React Router to
          get around and styled using Emotion CSS. I'm also using a homegrown
          component library that I've regretfully name PhantomArtist (never tell
          yourself that no matter what, you'll call something by whatever the Wu
          Tang name generator gives you).
        </p>
        <p>
          The backend is comprised of an Apollo GraphQL Server calling into a
          MongoDB database and serving up date from a (soon to be expired) S3
          bucket. Planning to move my storage locally.
        </p>
        <p>
          If you have a username/password, then you can login and play around
          with adding a movie or two. And if you'd like to peak at the code,{' '}
          <a href="http://github.com/collinlucke">click this stuff</a>{' '}
        </p>
        <p>
          Towards the bottom of the list you'll see a "Fight!" button. That's
          for later.
        </p>
      </InnerWidth>
      <Button className={baphStyles} onClick={navigateToList}>
        Have a Look Around!
      </Button>
    </Block>
  );
};

const baphStyles = {
  block: {
    flexDirection: 'column' as 'column',
    width: 'auto',
    position: 'absolute' as 'absolute',
    top: 0
  },
  button: {
    alignSelf: 'center',
    margin: '30px 0'
  },
  header: {
    textAlign: 'center' as 'center',
    flexDirection: 'column' as 'column'
  },
  imgWrapper: {
    width: '275px',
    alignSelf: 'center'
  },
  innerWidth: {
    flexDirection: 'column' as 'column',
    alignItems: 'start',
    alignSelf: 'center'
  }
};
