import React, { Component } from "react";

export default class Footer extends Component {
    render() {
        return (
            <footer className="container-fluid bg-light py-4 fixed-bottom border-top">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <div className="col-md-4 d-flex align-items-center">
                        <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                            <svg className="bi" width="30" height="24">
                                <use xlinkHref="#bootstrap"></use>
                            </svg>
                        </a>
                        <span className="mb-3 mb-md-0 text-muted">© 2022 - {new Date().getFullYear()}</span>
                    </div>

                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="ms-3"><a className="text-muted" href="#">
                            <svg className="bi" width="24" height="24">
                                <use xlinkHref="#twitter"></use>
                            </svg>
                        </a></li>
                        <li className="ms-3"><a className="text-muted" href="#">
                            <svg className="bi" width="24" height="24">
                                <use xlinkHref="#instagram"></use>
                            </svg>
                        </a></li>
                        <li className="ms-3"><a className="text-muted" href="#">
                            <svg className="bi" width="24" height="24">
                                <use xlinkHref="#facebook"></use>
                            </svg>
                        </a></li>
                    </ul>
                </div>
            </footer>
        );
    }
}