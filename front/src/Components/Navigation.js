import React from 'react';
import { Nav } from 'react-bootstrap';

export default () => 
    <Nav
        activeKey="/"
        onSelect={selectedKey => console.log(`selected ${selectedKey}`)}
        className="bg-light"
        fixed="true"
    >
        <Nav.Item>
            <Nav.Link href="/">Root</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="/check">API check</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="/map">Map</Nav.Link>
        </Nav.Item>
    </Nav>