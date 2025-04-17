/** @format */

// ~/components/ClientSelectorDrawer.tsx
import { Component, createMemo, Show, onMount, createEffect, createSignal } from "solid-js";

import { createVirtualizer } from "@tanstack/solid-virtual";
import { Client, ClientSelectorDrawerProps } from "~/types/types";
import {
	DrawerHeader,
	SearchInput,
	LetterIndex,
	ClientListDisplay,
} from "./ClientSelectorUI";

import {useClientSelectorState, useDrawer} from "~/hooks/hooks";

export const ClientSelectorDrawer: Component<ClientSelectorDrawerProps> = (props) => {
	 // Use the hook, passing props.allClients as an accessor
    const {
        searchTerm,
        setSearchTerm,
        selectedIndexLetter,
        setSelectedIndexLetter,
        filteredClients,
        clientIndexLetters,
        resetState // Get the reset function
    } = useClientSelectorState(() => props.allClients);
	
    const { isOpen: isClientDrawerOpen, closeDrawer: closeClientDrawer } = useDrawer();
   
   // --- Refs ---
    // Only keep refs needed for *internal* elements (like scrolling or input focus)
    let scrollContainerRef: HTMLDivElement | undefined;
    let searchInputRef: HTMLInputElement | undefined;
	
   // --- Effects ---
	  // Autofocus effect now depends on the isOpen prop
    createEffect(() => {
        if (isClientDrawerOpen() && searchInputRef) {
            setTimeout(() => searchInputRef?.focus(), 50);
        } else if (!isClientDrawerOpen()) {
             resetState(); // Call the reset function from the hook
        }
    });




	// --- Virtualization Setup ---
	// NOTE: The original JSX didn't actually *use* the virtualizer in the loop.
	//       We'll keep the setup but use the simple ClientListDisplay for now,
	//       matching the original rendered output.
	//       To implement virtualization fully, you'd replace ClientListDisplay
	//       with a component that uses rowVirtualizer.getVirtualItems() etc.
	const rowVirtualizer = createVirtualizer({
		get count() {
			return filteredClients().length;
		},
		getScrollElement: () => scrollContainerRef ?? null,
		estimateSize: (_index: number) => 36, // Adjust based on ClientListItem height
		overscan: 5,
	});


	// --- Event Handlers ---
	const handleLetterClick = (letter: string | null) => {
		setSelectedIndexLetter(letter);
		resetState(); // Reset search term when a letter is clicked
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
 	

	const handleClientSelect = (client: Client) => {
		props.setSelectedClient(client);
		//closeClientDrawer();  // Close the drawer when a client is selected
	};

	
	// --- Render Component JSX ---
    // Renders the content for the drawer's side panel.
    // Removed the outer drawer div, checkbox, overlay, etc.
    // Use <Show> to render content only when isOpen is true (optional optimization)
    return (
        <Show when={isClientDrawerOpen()}>
            {/* Drawer Content Container - This is the root element now */}
            <div class='bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col gap-4'>
                {/* Header - Pass the onClose prop */}
                <DrawerHeader title='Select Client' onClose={closeClientDrawer} />
                <SearchInput value={searchTerm()} placeholder='Search clients...' onInput={handleSearchInput} onFocus={handleSearchFocus} setRef={el => searchInputRef = el} />
                <div class='flex-grow overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-base-content scrollbar-track-base-200'>
                    {/* Main Content: A-Z Index + List */}
                    <div class='flex flex-grow gap-2 overflow-hidden'>
                        <LetterIndex
                            letters={clientIndexLetters()}
                            selectedLetter={selectedIndexLetter()}
                            onLetterSelect={handleLetterClick}
                        />
                        <div ref={scrollContainerRef!} class='flex-grow overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-base-content scrollbar-track-base-200'>
                            <ClientListDisplay
                                clients={filteredClients()}
                                onClientSelect={handleClientSelect}
                                noResultsMessage={
                                    searchTerm()
                                        ? `No results for "${searchTerm()}"`
                                        : selectedIndexLetter()
                                            ? `No clients found starting with "${selectedIndexLetter()}"`
                                            : "No clients match the current filters."
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Show>
    );
};

