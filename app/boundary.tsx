import { useInstantSearch } from "react-instantsearch";

export function NoResultsBoundary({
    children,
    fallback
  }: {
    children: React.ReactNode;
    fallback: React.ReactNode;
  }) {
    const { results } = useInstantSearch();

    if (!results.__isArtificial && results.nbHits === 0) {
        return (
        <>
            {fallback}
            <div hidden>{children}</div>
        </>
        );
    }

    return children;
}
  
export function NoResults() {
    return (
        <div>
        <h1 className="text-xl font-medium">No results found</h1>
        <p>
            THIS IS WHAT WE WANT TO SEE WHEN SERVER RENDERED
        </p>
        </div>
    );
}