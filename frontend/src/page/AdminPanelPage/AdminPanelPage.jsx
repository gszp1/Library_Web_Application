import React , {useState} from "react";
import './AdminPanelStyles.css';
import ResourcesSection from "./ResourcesSection";
import StatisticsSection from "./StatisticsSection";
import UsersSection from "./UsersSection";
import { useNavigate } from "react-router-dom";
import ErrorSection from "./ErrorSection";

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
            case 'Statistics':
                return (<StatisticsSection />);
            case 'Users':
                return (<UsersSection setSection={setSection}/>);
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
                <li id='Users' onClick={handleClick}>
                    Users
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