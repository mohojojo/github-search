
import * as searchActions from './search.actions';
import { initialState, SearchReducer } from './search.reducer';
import mockrepoData from '@app/mock/RepositoriesData';
import { IPageProps, Repository } from '@app/shared/models/search/models';

describe('Search Reducer', () => {

    describe('undefined action', () => {
        it('should return the default state', () => {
        const action = { type: 'NOOP' } as any;
        const result = SearchReducer(undefined, action);

        expect(result).toBe(initialState);
        });
    });

    describe('[Search] GetSearchUserResults', () => {
        it('should toggle loading state', () => {
        const action = new searchActions.GetSearchResults();
        const result = SearchReducer(initialState, action);

        expect(result).toEqual({
            ...initialState,
            error: false,
            loading: true
        });
        });
    });

    describe('[Search] GetSearchUserResults Success', () => {
        it('should add all repos to state', () => {
            const repos = mockrepoData;
            const action = new searchActions.GetSearchResultsSuccess({items: repos});
            const result = SearchReducer(initialState, action);

            expect(result).toEqual({
            ...initialState,
            items: repos,
            loading: false
            });
        });
    });

    describe('[Search] GetSearchUserResults Error', () => {
        it('should update error in state', () => {
            const error = true;
            const action = new searchActions.GetSearchResultsError();
            const result = SearchReducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
                error,
                loading: false
            });
        });
    });

    describe('[Search] SetSearchText', () => {
        it('should update search text in state', () => {
            const text = 'test';
            const action = new searchActions.SetSearchText(text);
            const result = SearchReducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
                searchText: text
            });
        });
    });

    describe('[Search] SetRepoPaging', () => {
        it('should update paging settings in state', () => {
            const paging: IPageProps = { page: 1, per_page: 5 };
            const action = new searchActions.SetRepoPaging(paging);
            const result = SearchReducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
                pageProps: { ...paging }
            });
        });
    });

    describe('[Search] SetSelectedRepo', () => {
        it('should set selected repo in state', () => {
            const selectedRepo: Repository = mockrepoData[0];
            const action = new searchActions.SetSelectedRepository(selectedRepo);
            const result = SearchReducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
                selectedRepo
            });
        });
    });
});
