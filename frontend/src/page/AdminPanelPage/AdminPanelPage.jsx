import React , {useState} from "react";
import './AdminPanelStyles.css';
import ResourcesSection from "./ResourcesSection";
import StatisticsSection from "./StatisticsSection";
import UsersSection from "./UsersSection";

function AdminPanelPage() {
    const [section, setSection] = useState('Resources');

    const handleClick = (e) => {
        setSection(e.currentTarget.id);
    }

    const renderSection = () => {
        switch(section) {
            case 'Resources':
                return (<ResourcesSection />);
            case 'Statistics':
                return (<StatisticsSection />);
            case 'Users':
                return (<UsersSection />);
            default:
                return (<ResourcesSection />);
        }
    }

    return (
        <div className='adminPanelContent'>
            <ul className='adminPanelNavigation'>
                <li id='Resources'>
                    Resources
                </li>
                <li id='Users'>
                    Users
                </li>
                <li id='Statistics'>
                    Statistics
                </li>
            </ul>
            {renderSection()}
        </div>
    );
}

export default AdminPanelPage;