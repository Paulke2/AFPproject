import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const WeekLayout = ()=>{

    return (<>  <CardGroup style={{padding:"20px"}}>
      <Card>
        <Card.Body style={{minHeight:"500px",padding:"20px"}}>
          <Card.Title>Sunday</Card.Title>
          <Card.Text>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Total Hrs:</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Monday</Card.Title>
          <Card.Text>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Total Hrs:</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Tuesday</Card.Title>
          <Card.Text>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Total Hrs:</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Wednesday</Card.Title>
          <Card.Text>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Total Hrs:</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Thursday</Card.Title>
          <Card.Text>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Total Hrs:</small>
        </Card.Footer>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Friday</Card.Title>
          <Card.Text>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Total Hrs:</small>
        </Card.Footer>
      </Card>
      <Card>
        
        <Card.Body>
          <Card.Title>Saturday</Card.Title>
          <Card.Text>
            
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Total Hrs:</small>
        </Card.Footer>
      </Card>
    </CardGroup></>);
}

export default WeekLayout;