'use client';

import {  Hits,  SearchBoxProps, useSearchBox } from 'react-instantsearch';
import { StateMapping, UiState } from 'instantsearch.js';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { NoResults, NoResultsBoundary } from './boundary';


const appId = ''

const apiKey =''

const indexName = ''

const searchClient = algoliasearch(appId, apiKey);

interface UrlState {
  term?: string;
}

const stateMapping: StateMapping<UiState, UrlState> = {
  stateToRoute(uiState) {
    const indexUiState = uiState[indexName] || {};

    return {
      term: indexUiState.query,

    };
  },

  routeToState(routeState) {
    return {
      [indexName]: {
        query: routeState.term
      }
    };
  }
};

function VirtualSearchBox(props: SearchBoxProps) {
    useSearchBox(props); 
    return null;
}

export const PageClient = () => {
  return (
    <InstantSearchNext searchClient={searchClient} indexName={'dev_noProductFlash'} routing={{stateMapping}}>
      <NoResultsBoundary fallback={<NoResults />}>
        <div>
            <h1 className="text-xl font-medium">These are the results: </h1>
            <div className="space-y-5 max-sm:col-full">
                <div className="flex flex-col gap-5 md:flex-row">
                    <VirtualSearchBox />
                    <Hits  />
                </div>
            </div>
        </div>
        </NoResultsBoundary>
      </InstantSearchNext>
  );
};
