// vim:sw=2:et:
/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeHero extends React.Component {
  render() {
    return (
      <div id="hero">
        <div className='container'>
          <div id='hero-pipeline-webinar'>
            <div className='container'>
              <div className='text'>
                <h1>Streaming Pipelines</h1>
                <h2>A webinar on using RabbitMQ and Project Reactor</h2>
                <h2>Feb 13 | <a href="https://content.pivotal.io/rabbitmq/feb-13-how-to-build-reliable-streaming-pipelines-with-rabbitmq-and-project-reactor-webinar?utm_campaign=reactor-streaming-webinar-banner&amp;utm_source=rabbitmq&amp;utm_medium=website">Register today</a></h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Intro extends React.Component {
  render() {
    return (
      <div id='intro'>
        <div className='container'>
          <div className='column twothirds'>
            <div className='inner'>
              <h1>RabbitMQ is the most widely deployed open source message broker.</h1>
              <p>
                With tens of thousands of users, RabbitMQ is one of the most popular open source message brokers. From <a href="https://www.youtube.com/watch?v=1qcTu2QUtrU">T-Mobile</a>
                to <a href="https://medium.com/@runtastic/messagebus-handling-dead-letters-in-rabbitmq-using-a-dead-letter-exchange-f070699b952b">Runtastic</a>, RabbitMQ is used worldwide at small startups and large enterprises.
              </p>
              <p>
                RabbitMQ is lightweight and easy to deploy on premises
                and in the cloud. It supports multiple messaging
                protocols. RabbitMQ can be deployed in distributed and
                federated configurations to meet high-scale,
                high-availability requirements.
              </p>
              <p>
                RabbitMQ runs on many operating systems and cloud
                environments, and provides a <a href="/devtools.html">wide range of developer
                tools for most popular languages</a>.
              </p>
              <p>
                See how other people are using RabbitMQ:
              </p>
              <br/>
              <div id="UfEmbeddedHub1501190831892"></div>
              <p id='morelinkafterufembed'><a href='https://content.pivotal.io/rabbitmq'>More <span className="arrow"></span></a></p>
            </div>
          </div>
          <div className='column onethird'>
            <div className='container'>
              <div id='releases'>
                <h2>Updates</h2>
                <p><a href='/news.html'>More updates<span className='arrow'></span></a></p>
              </div>
              <div id='twitterfeed'>
                <h2>Tweets</h2>
                <a className="twitter-timeline" href="https://twitter.com/RabbitMQ" data-chrome="noheader nofooter noborders transparent noscrollbar" data-tweet-limit='2'></a>
                <p><a href='https://twitter.com/RabbitMQ'>More tweets<span className='arrow'></span></a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = props => (
      <h2 className="projectTitle">
        {props.title}
        <small>{props.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/undraw_monitor.svg`} />
        <div className="inner">
          <ProjectTitle tagline={siteConfig.tagline} title={siteConfig.title} />
          <PromoSection>
            <Button href="#try">Try It Out</Button>
            <Button href={docUrl('doc1.html')}>Example Link</Button>
            <Button href={docUrl('doc2.html')}>Example Link 2</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>Feature Callout</h2>
        <MarkdownBlock>These are features of this project</MarkdownBlock>
      </div>
    );

    const TryOut = () => (
      <Block id="try">
        {[
          {
            content:
              'To make your landing page more attractive, use illustrations! Check out ' +
              '[**unDraw**](https://undraw.co/) which provides you with customizable illustrations which are free to use. ' +
              'The illustrations you see on this page are from unDraw.',
            image: `${baseUrl}img/undraw_code_review.svg`,
            imageAlign: 'left',
            title: 'Wonderful SVG Illustrations',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              'This is another description of how this project is useful',
            image: `${baseUrl}img/undraw_note_list.svg`,
            imageAlign: 'right',
            title: 'Description',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content:
              'Each new Docusaurus project has **randomly-generated** theme colors.',
            image: `${baseUrl}img/undraw_youtube_tutorial.svg`,
            imageAlign: 'right',
            title: 'Randomly Generated Theme Colors',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'This is the content of my feature',
            image: `${baseUrl}img/undraw_react.svg`,
            imageAlign: 'top',
            title: 'Feature One',
          },
          {
            content: 'The content of my second feature',
            image: `${baseUrl}img/undraw_operating_system.svg`,
            imageAlign: 'top',
            title: 'Feature Two',
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeHero siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Intro siteConfig={siteConfig} language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Index;
