import React , {useState} from "react";
import './AdminPanelStyles.css';
import ResourcesSection from "./ResourcesSection";
import StatisticsSection from "./StatisticsSection";
import UsersSection from "./UsersSection";
import { useNavigate } from "react-router-dom";
import ErrorSection from "./ErrorSection";
import AddResourceSection from "./AddResourceSection";
import ReservationsSection from "./ReservationsSection";
import AuthorsSection from "./AuthorsSection/AuthorsSerction";
import AddAuthorSection from "./AuthorsSection/AddAuthorSection";

function AdminPanelPage() {
    const [section, setSection] = useState('Resources');
    const navigate = useNavigate();

    const handleClick = (e) => {
        setSection(e.currentTarget.id);
    }

    const logout = () => {
        localStorage.removeItem('WebLibToken');
        setTimeout(() => {
            navigate('/resources');
        }, 400)
    }

    const renderSection = () => {
        switch(section) {
            case 'Resources':
                return (<ResourcesSection />);
            case 'AddResource':
                return (<AddResourceSection/>);
            case 'Statistics':
                return (<StatisticsSection />);
            case 'Reservations':
                return (<ReservationsSection setSection={setSection}/>);
            case 'Users':
                return (<UsersSection setSection={setSection}/>);
            case 'Authors':
                return (<AuthorsSection setSection={section}/>)
            case 'AddAuthor':
                return (<AddAuthorSection setSection={section}/>)
            case 'Error':
                setTimeout(() => {
                    localStorage.removeItem('WebLibToken');
                    navigate('/resources');
                }, 500)
                return <ErrorSection />
            default:
                return (<ResourcesSection />);
        }
    }
    return (
        <div className='adminPanelContent'>
            <ul className='adminPanelNavigation'>
                <li id='Resources' onClick={handleClick}>
                    Resources
                </li>
                <li id='AddResource' onClick={handleClick}>
                    Add Resource
                </li>
                <li id='Users' onClick={handleClick}>
                    Users
                </li>
                <li id='Authors' onClick={handleClick}>
                    Authors
                </li>
                <li id='AddAuthor' onClick={handleClick}>
                    Add Author
                </li>
                <li id='Reservations' onClick={handleClick}>
                    Reservations
                </li>
                <li id='Statistics' onClick={handleClick}>
                    Statistics
                </li>
                <li
                    style={{color: 'red', fontWeight: "bold"}}
                    onClick={logout}
                >
                    Logout
                </li>
            </ul>
            {renderSection()}
        </div>
    );
}

export default AdminPanelPage;