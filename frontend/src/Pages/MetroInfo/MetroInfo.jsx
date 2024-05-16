import React from 'react';

const MetroInfo = () => {
    return (
        <div className="container mx-auto px-4 py-8">
     
            <div className="text-center mt-20">
                <h2 className='text-4xl font-semibold text-green-500'>Metro Schedule</h2>
            </div>
    
            <div className="overflow-x-auto">
        
                <table className="table table-xs table-pin-rows table-pin-cols mt-14">
                    <thead>
                        <tr>
                            <th></th>
                            <td>Board Station</td>
                            <td>Destination Station</td>
                            <td>Time</td>
                            <td>Board station</td>
                            <td>Destination Station</td>
                            <td>Time</td>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Uttara North</td>
                            <td>Pallabi</td>
                            <td>7:45 A.M</td>
                            <td>Mirpur-11</td>
                            <td>Shahbag</td>
                            <td>6:00 P.M</td>
                            <th>1</th>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>Kazipara</td>
                            <td>Agargaon</td>
                            <td>8:30 A.M</td>
                            <td>Bijoy Sarani</td>
                            <td>Farmgate</td>
                            <td>5:30 P.M</td>
                            <th>2</th>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>Uttara Center</td>
                            <td>Shewrapara</td>
                            <td>9:15 A.M</td>
                            <td>Shahbag</td>
                            <td>Dhaka University</td>
                            <td>4:45 P.M</td>
                            <th>3</th>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td>Agargaon</td>
                            <td>Bijoy Sarani</td>
                            <td>10:00 A.M</td>
                            <td>Dhaka University</td>
                            <td>Bangladesh Secretariat</td>
                            <td>4:00 P.M</td>
                            <th>4</th>
                        </tr>
                        <tr>
                            <th>5</th>
                            <td>Shewrapara</td>
                            <td>Agargaon</td>
                            <td>10:45 A.M</td>
                            <td>Motijheel</td>
                            <td>Uttara Center</td>
                            <td>3:30 P.M</td>
                            <th>5</th>
                        </tr>
                        {/* You can continue this structure for the remaining rows */}
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
};

export default MetroInfo;
