import { useEffect, useState } from "react";
import { Pagination, Container, Row, Form } from "react-bootstrap";

interface Props {
  current: number; // current page selected
  perPage: number; // number of items per page
  totalPages: number; // total number of pages
  totalItems: number; // total number of items across all pages
  onChangePage: (selectedPage: any) => void; // how to handle changing pages
  onChangePerPage: (selectedPerPage: any) => void; // how to handle changing per page value
}

const PageSelect = ({
  current,
  perPage,
  totalPages,
  totalItems,
  onChangePage,
  onChangePerPage,
}: Props) => {
  let pageButtons: JSX.Element[] = [];
  //No need for any ellipses
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <Pagination.Item
          key={i}
          active={i === current}
          onClick={() => onChangePage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  } else {
    //Always need first page button
    pageButtons.push(
      <Pagination.Item
        key={1}
        active={1 === current}
        onClick={() => onChangePage(1)}
      >
        {1}
      </Pagination.Item>
    );
    //No need for left ellipsis
    if (current <= 4) {
      for (let i = 2; i <= 5; i++) {
        pageButtons.push(
          <Pagination.Item
            key={i}
            active={i === current}
            onClick={() => onChangePage(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      //Need left ellipsis
      pageButtons.push(<Pagination.Ellipsis key={"lell"} />);
    }
    //Somewhere in the middle of the page numbers, both ellipses needed
    if (current > 4 && current < totalPages - 3) {
      for (let i = current - 1; i <= current + 1; i++) {
        pageButtons.push(
          <Pagination.Item
            key={i}
            active={i === current}
            onClick={() => onChangePage(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    }
    //No need for right ellipsis
    if (current >= totalPages - 3) {
      for (let i = totalPages - 4; i <= totalPages - 1; i++) {
        pageButtons.push(
          <Pagination.Item
            key={i}
            active={i === current}
            onClick={() => onChangePage(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      //Need right ellipsis
      pageButtons.push(<Pagination.Ellipsis key={"rell"} />);
    }
    //Always need last page button
    pageButtons.push(
      <Pagination.Item
        key={totalPages}
        active={totalPages === current}
        onClick={() => onChangePage(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );
  }

  const [buttonSize, setButtonSize] = useState<any>(undefined);
  const handleResizeWindow = () => {
    if (window.innerWidth >= 992 && window.innerWidth < 1400) {
      setButtonSize("sm");
    } else {
      setButtonSize(undefined);
    }
  };

  useEffect(() => {
    handleResizeWindow();
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  const perPageOptions = [5, 10, 15, 20];

  return (
    <div className="pageSelect">
      <Container>
        <Row>
          <Pagination size={buttonSize} style={{ justifyContent: "center" }}>
            <Pagination.First
              key={"toFirst"}
              disabled={current === 1}
              onClick={() => onChangePage(1)}
            />
            <Pagination.Prev
              key={"toPrev"}
              disabled={current === 1}
              onClick={() => onChangePage(current - 1)}
            />
            {pageButtons}
            <Pagination.Next
              key={"toNext"}
              disabled={current === totalPages}
              onClick={() => onChangePage(current + 1)}
            />
            <Pagination.Last
              key={"toLast"}
              disabled={current === totalPages}
              onClick={() => onChangePage(totalPages)}
            />
          </Pagination>
        </Row>
        <Row>
          <p className="text-muted">
            Displaying {(current - 1) * perPage + 1} to{" "}
            {Math.min(totalItems, current * perPage)} of {totalItems} items.
          </p>
          <p className="text-muted">Per page</p>
          <Form>
            <Form.Select size="sm" onChange={(e) => onChangePerPage(e)}>
              {perPageOptions.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Form.Select>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default PageSelect;
