import React from 'react';
import { Navigation } from 'react-native-navigation';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';

import Developers from './Developers';
import DevelopersByTotalStarred from './Developers/tabs/ByTotalStarred';
import DevelopersByFollowers from './Developers/tabs/ByFollowers';
import DevelopersByDate from './Developers/tabs/ByDate';
import Locations from './Locations';
import Languages from './Languages';
import Repositories from './Repositories';
import Developer from './Developer';
import Location from './Location';
import DeveloperRepositories from './DeveloperRepositories';
import DeveloperLanguages from './DeveloperLanguages';

import iconDevelopers from '../../assets/images/icons/developers.png';
import iconLocations from '../../assets/images/icons/locations.png';
import iconLanguages from '../../assets/images/icons/languages.png';
import iconRepositories from '../../assets/images/icons/repositories.png';

// const navigatorStyle = {};
const tabsStyle = {
  tabBarSelectedButtonColor: '#333',
};

const cache = new InMemoryCache();

const localClient = new ApolloClient({
  link: createHttpLink({
    uri: 'https://data.github.ist/graphql',
  }),
  cache,
});

const withProvider = (Component, client = localClient) => {
  return class extends React.Component {
    static options = Component.options;

    render() {
      return (
        <ApolloProvider client={client}>
          <Component {...this.props} />
        </ApolloProvider>
      );
    }
  };
};

export const Routes = {
  Developers: {
    screen: 'app.Developers',
    generator: () => withProvider(Developers),
    title: 'Geliştiriciler',
    label: 'Geliştiriciler',
    icon: iconDevelopers,
  },
  DevelopersByTotalStarred: {
    screen: 'app.DevelopersByTotalStarred',
    generator: () => withProvider(DevelopersByTotalStarred),
    title: "Star'lanma Sayısına Göre",
  },
  DevelopersByFollowers: {
    screen: 'app.DevelopersByFollowers',
    generator: () => withProvider(DevelopersByFollowers),
    title: 'Takipçi Sayısına Göre',
  },
  DevelopersByDate: {
    screen: 'app.DevelopersByDate',
    generator: () => withProvider(DevelopersByDate),
    title: 'İlk Keşfedenler',
  },
  Locations: {
    screen: 'app.Locations',
    generator: () => withProvider(Locations),
    title: 'Şehirler',
    label: 'Şehirler',
    icon: iconLocations,
  },
  Languages: {
    screen: 'app.Languages',
    generator: () => withProvider(Languages),
    title: 'Languages',
    label: 'Languages',
    icon: iconLanguages,
  },
  Repositories: {
    screen: 'app.Repositories',
    generator: () => withProvider(Repositories),
    title: 'Repositories',
    label: 'Repositories',
    icon: iconRepositories,
  },
  Developer: {
    screen: 'app.Developer',
    generator: () => withProvider(Developer),
    title: 'Developer',
  },
  Location: {
    screen: 'app.Location',
    generator: () => withProvider(Location),
    title: 'Location',
  },
  DeveloperRepositories: {
    screen: 'app.DeveloperRepositories',
    generator: () => withProvider(DeveloperRepositories),
    title: 'DeveloperRepositories',
  },
  DeveloperLanguages: {
    screen: 'app.DeveloperLanguages',
    generator: () => withProvider(DeveloperLanguages),
    title: 'DeveloperLanguages',
  },
};

export function registerScreens() {
  Object.values(Routes).forEach(route => {
    Navigation.registerComponent(route.screen, route.generator);
  });
}

export function openHomeScreen() {
  Navigation.startTabBasedApp({
    tabs: [Routes.Developers, Routes.Locations, Routes.Languages, Routes.Repositories],
    tabsStyle: { ...tabsStyle },
  });
}
