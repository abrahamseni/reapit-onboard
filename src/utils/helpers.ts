import { CellProps, elSpan2, RowProps } from '@reapit/elements'
import { PropertyModel, PropertyModelPagedResult } from '@reapit/foundations-ts-definitions'
import { renderTableExpandableComponent } from './renderComponents'

export function createTableRows(data: PropertyModelPagedResult) {
  const expandableContent = (embed: PropertyModel) => {
    return {
      content: renderTableExpandableComponent(embed),
    }
  }

  let newTableData: RowProps[] = []
  if (data && data._embedded) {
    newTableData = data._embedded.map((property: PropertyModel) => {
      const cells: CellProps[] = [
        {
          label: 'Property',
          value: `${property.address?.line1}, ${property.address?.line2}`,
          className: elSpan2,
          icon: 'homeSystem',
          cellHasDarkText: true,
          narrowTable: {
            showLabel: true,
          },
        },
        { label: 'Agent', value: property?.negotiatorId ?? '' },
        { label: 'Client A/C', value: property?.officeIds?.join(' ') ?? '' },
        {
          label: 'Description',
          value: property?.description ?? '',
        },
        {
          label: 'Type',
          value: property?.type?.join(' ') ?? '',
        },
        {
          label: 'Amount',
          value: `${property.currency} ${property.selling?.price ?? 0}`,
          cellHasDarkText: true,
        },
        {
          label: 'Payment Status',
          value: property.selling?.status ?? '',
        },
      ]
      return {
        cells,
        expandableContent: expandableContent(property),
      }
    })
  }
  return newTableData
}
