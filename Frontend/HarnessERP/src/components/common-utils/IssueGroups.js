import React, {useEffect, useState} from 'react';
import TableComponent from './TableComponent';
import TitleBar from './TitleBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View} from 'react-native';
import CustomButton from './CustomButton';
import {Text} from 'react-native';

function IssueGroups(props) {
  const navigation = useNavigation();

  const initialData = [
    {
      acquisitionDate: '2024-06-03',
      assetCode: 'JJ09:FA:B03:TFC02:0130',
      assetId: 534,
      bookValue: 0,
      category: 'fixed',
      classificationName: 'File',
      custSpec: 'Tan_File_Req_01',
      deptName: 'Testing',
      lifetimeOfAssetValue: 3,
      locationName: 'AeetLocation',
      matNo: 78782,
      ownerShip: 'Own',
      poNo: 30440,
      purchaseVal: 3,
      salvageVal: 2,
      status: 'Active',
      subDeptName: 'test',
      subLocation: 'Coimbatore',
      supplierName: 'Inco Pvt Ltd',
      type: 'TAN_File_CWIP_Mat02',
      acquisitionate: '2024-06-03',
      asstCode: 'JJ09:FA:B03:TFC02:0130',
      assetId: 534,
      bookalue: 0,
      caegory: 'fixed',
      classifcationName: 'File',
      custpec: 'Tan_File_Req_01',
      deptName: 'Testing',
      liftimeOfAssetValue: 3,
      locationName: 'AeetLocation',
      matNo: 78782,
      ownerShip: 'Own',
      poNo: 30440,
      purchaseVal: 3,
      salvageVal: 2,
      status: 'Active',
      subDeptName: 'test',
      subLocation: 'Coimbatore',
      supplierName: 'Inco Pvt Ltd',
      type: 'TAN_File_CWIP_Mat02',
    },
    {
      acquisitionDate: '2024-05-19',
      assetCode: 'JJ09:FA:B03:TFC02:01382',
      assetId: 2916,
      bookValue: 0,
      category: 'fixed',
      classificationName: 'File',
      custSpec: 'Tan_File_Req_01',
      deptName: 'Ad',
      lifetimeOfAssetValue: 4,
      locationName: 'Loc',
      matNo: 78782,
      ownerShip: 'Own',
      poNo: 30440,
      purchaseVal: 3.53,
      salvageVal: null,
      status: 'Active',
      subDeptName: 'Testinggg',
      subLocation: '22',
      supplierName: 'Inco Pvt Ltd',
      type: 'TAN_File_CWIP_Mat02',
    },
    {
      acquisitionDate: '2024-06-19',
      assetCode: 'JJ09:FA:B03:TFC02:01382',
      assetId: 2916,
      bookValue: 0,
      category: 'fixed',
      classificationName: 'File',
      custSpec: 'Tan_File_Req_01',
      deptName: 'Ad',
      lifetimeOfAssetValue: 4,
      locationName: 'Loc',
      matNo: 78782,
      ownerShip: 'Own',
      poNo: 30440,
      purchaseVal: 3.53,
      salvageVal: null,
      status: 'Active',
      subDeptName: 'Testinggg',
      subLocation: '22',
      supplierName: 'Inco Pvt Ltd',
      type: 'TAN_File_CWIP_Mat02',
    },
    {
      acquisitionDate: '2024-06-19',
      assetCode: 'JJ09:FA:B03:TFC02:01382',
      assetId: 2916,
      bookValue: 0,
      category: 'fixed',
      classificationName: 'File',
      custSpec: 'Tan_File_Req_01',
      deptName: 'Ad',
      lifetimeOfAssetValue: 4,
      locationName: 'Loc',
      matNo: 78782,
      ownerShip: 'Own',
      poNo: 30440,
      purchaseVal: 3.53,
      salvageVal: null,
      status: 'Active',
      subDeptName: 'Testinggg',
      subLocation: '22',
      supplierName: 'Inco Pvt Ltd',
      type: 'TAN_File_CWIP_Mat02',
    },
  ];
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    console.log("Selected Row:", selectedRow);

    if (selectedRow !== null && selectedRow >= 0 && selectedRow < initialData.length) {
      setSelectedData([initialData[selectedRow]]);
      setSelectedRow(null)
    }
  }, [selectedRow, initialData]);
  return (
    <View>
      <TitleBar
        text="Issue Group"
        showMenuBar={true}
        onMenuPress={() => navigation.openDrawer()}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <CustomButton>Issue</CustomButton>
      </View>

      <TableComponent
        initialData={initialData}
        onRowIndexSelect={setSelectedRow}
        noModel={false}
        style={{ marginTop: 20 }} // Adjusted marginTop for better visibility
      />

      {selectedData.length > 0 && (
        <TableComponent
          key={selectedRow} // Adding a unique key to force re-render when selectedData changes
          initialData={selectedData}
          noModel={true}
          style={{ marginTop: 20 }} // Adjusted marginTop for better visibility
        />
      )}
    </View>
  );
}

export default IssueGroups;