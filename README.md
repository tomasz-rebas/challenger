# TicketSwap challenger solution 🚀

## Setup

1. Clone the repo.
2. Install the packages with `npm install`.
3. (Optional) Provide a `.env` file with `NEXT_PUBLIC_BASE_URL` (default: `http://localhost:3000`).
4. Run the development server with `npm run dev`.
5. Run the e2e tests with `npx playwright test`.

## My feature suggestions

### Fetching strategy

For a larger dataset – let's say, hundreds of events – **debouncing** the search by a split second would improve performance since the list wouldn't update after each keystroke.

For thousands of events, I would switch to server-side filtering with pagination to reduce payload size. Clicking the `Apply filters` button would fetch the filtered data from the API.

The pagination could be based on `amount` and `offset` query parameters that were initially present in the code. Since they're not utilized in the current form, I decided to remove them.

The challenger dataset is quite small and we're only talking about _popular_ events in the assignment, so I consider the reactive approach to be sufficient here.

### Navigation

Add links on the event detail page to navigate between neighbouring events. This would improve the browsing flow by allowing users to move sequentially without returning to the home page. The links would appear at the top of the page, with corresponding arrow icons and keyboard shortcuts for accessibility.
