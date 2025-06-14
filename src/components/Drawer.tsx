/** @format */

// ~/components/Drawer.tsx
import { Show, createEffect } from 'solid-js';
import { createVirtualizer } from '@tanstack/solid-virtual';
import {
  DrawerHeader,
  SearchInput,
  LetterIndex,
  ListDisplay,
} from './DrawerUI';

import {
  useDataSelectorState,
  useDrawer,
  useSelectedData,
} from '~/hooks/hooks';
import { drawSearchPlaceholder, useData } from '~/store/store';

export const Drawer = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedIndexLetter,
    setSelectedIndexLetter,
    filteredData,
    indexLetters,
  } = useDataSelectorState();

  const { isOpen: isClientDrawerOpen, closeDrawer: closeClientDrawer } =
    useDrawer(true);

  let scrollContainerRef: HTMLDivElement | undefined;
  let searchInputRef: HTMLInputElement | undefined;

  createEffect(() => {
    const { selectedData } = useSelectedData();
    console.log('selectedData:', selectedData());
  });

  createEffect(() => {
    if (isClientDrawerOpen() && searchInputRef) {
      setTimeout(() => searchInputRef?.focus(), 50);
    } else if (!isClientDrawerOpen()) {
      setSearchTerm('');
      setSelectedIndexLetter(null);
    }
  });

  const rowVirtualizer = createVirtualizer({
    get count() {
      return filteredData().length;
    },
    getScrollElement: () => scrollContainerRef ?? null,
    estimateSize: (_index: number) => 36,
    overscan: 5,
  });

  const handleLetterClick = (letter: string | null) => {
    setSelectedIndexLetter(letter);
    setSearchTerm('');
    scrollContainerRef?.scrollTo({ top: 0 });
  };

  const handleSearchInput = (event: Event) => {
    const newSearchTerm = (event.target as HTMLInputElement).value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.trim()) {
      setSelectedIndexLetter(null);
    }
  };

  const handleSearchFocus = () => setSelectedIndexLetter(null);

  return (
    <Show when={isClientDrawerOpen()}>
      <div class="bg-base-200 text-base-content h-screen w-80 flex flex-col overflow-hidden z-50">
        <div class="sticky top-0 z-10 p-4 flex flex-col gap-4 bg-base-200">
          <DrawerHeader onClose={closeClientDrawer} />
          <SearchInput
            value={searchTerm()}
            placeholder={drawSearchPlaceholder()}
            onInput={handleSearchInput}
            onFocus={handleSearchFocus}
            setRef={(el) => (searchInputRef = el)}
          />
        </div>

        <div class="flex-grow min-h-0 flex gap-2 overflow-hidden px-4 pt-4">
          <div class="pt-4">
            <LetterIndex
              letters={indexLetters()}
              selectedLetter={selectedIndexLetter()}
              onLetterSelect={handleLetterClick}
            />
          </div>

          <div
            ref={scrollContainerRef!}
            class="flex-grow h-full overflow-y-auto overscroll-contain min-h-0 p-4"
          >
            <ListDisplay
              filteredData={filteredData()}
              noResultsMessage={
                searchTerm()
                  ? `No results for "${searchTerm()}"`
                  : selectedIndexLetter()
                  ? `No clients found starting with "${selectedIndexLetter()}"`
                  : 'No clients match the current filters.'
              }
            />
          </div>
        </div>

        <div class="flex-shrink-0 h-10 bg-base-200 mt-2">
          <div class="flex items-center justify-center h-full">
            <label class="cursor-pointer label">Footer Content</label>
          </div>
        </div>
      </div>
    </Show>
  );
};
